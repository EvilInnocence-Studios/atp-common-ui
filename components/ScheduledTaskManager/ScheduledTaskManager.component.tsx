import {
    IScheduledTask,
    IScheduledTaskLog,
    IScheduledTaskUpdate
} from "@common-shared/scheduledTask/types";
import {
    faArrowsRotate,
    faCalendarCheck,
    faCircleCheck,
    faCircleExclamation,
    faCircleXmark,
    faClock,
    faCopy,
    faGear,
    faList,
    faPlay,
    faSpinner,
    faStopwatch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Card,
    Col,
    Drawer,
    Form,
    Input,
    InputNumber,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    Table,
    Tag,
    Tooltip,
    Typography,
    notification
} from "antd";
import cronstrue from "cronstrue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { ScheduledTaskManagerProps } from "./ScheduledTaskManager.d";
import defaultStyles from "./ScheduledTaskManager.module.scss";

dayjs.extend(relativeTime);

const { Text, Paragraph } = Typography;

const COMMON_TIMEZONES = [
    { label: "UTC (Coordinated Universal Time)", value: "UTC" },
    { label: "America/New_York (Eastern Time)", value: "America/New_York" },
    { label: "America/Chicago (Central Time)", value: "America/Chicago" },
    { label: "America/Denver (Mountain Time)", value: "America/Denver" },
    { label: "America/Los_Angeles (Pacific Time)", value: "America/Los_Angeles" },
    { label: "Europe/London (GMT/BST)", value: "Europe/London" },
    { label: "Europe/Paris (CET)", value: "Europe/Paris" },
    { label: "Asia/Tokyo (JST)", value: "Asia/Tokyo" },
];

const CRON_PRESETS = [
    { label: "Daily at Midnight (0 0 * * *)", value: "0 0 * * *" },
    { label: "Daily at 6:00 AM (0 6 * * *)", value: "0 6 * * *" },
    { label: "Daily at 12:00 PM (0 12 * * *)", value: "0 12 * * *" },
    { label: "Daily at 6:00 PM (0 18 * * *)", value: "0 18 * * *" },
    { label: "Weekdays at 9:00 AM (0 9 * * 1-5)", value: "0 9 * * 1-5" },
    { label: "Weekly on Sunday at Midnight (0 0 * * 0)", value: "0 0 * * 0" },
    { label: "Monthly on 1st at Midnight (0 0 1 * *)", value: "0 0 1 * *" },
    { label: "Custom Expression", value: "custom" },
];

const formatInterval = (minutes: number | null | undefined): string => {
    if (!minutes) return "60 mins";
    if (minutes < 60) return `${minutes} mins`;
    if (minutes % 1440 === 0) {
        const days = minutes / 1440;
        return days === 1 ? "1 day" : `${days} days`;
    }
    if (minutes % 60 === 0) {
        const hours = minutes / 60;
        return hours === 1 ? "1 hour" : `${hours} hours`;
    }
    return `${minutes} mins`;
};

const getModuleColor = (moduleName: string): string => {
    switch (moduleName.toLowerCase()) {
        case "comic":
            return "purple";
        case "analytics":
            return "cyan";
        case "common":
            return "blue";
        case "store":
            return "green";
        case "theming":
            return "magenta";
        default:
            return "geekblue";
    }
};

export const ScheduledTaskManagerComponent: React.FC<ScheduledTaskManagerProps> = ({
    tasks,
    isLoading,
    refresh,
    toggleEnabled,
    runTask,
    runAll,
    runningTaskId,
    isRunningAll,

    editModalVisible,
    selectedTaskForEdit,
    openEditModal,
    closeEditModal,
    saveTaskConfig,

    errorModalVisible,
    selectedTaskForError,
    openErrorModal,
    closeErrorModal,

    logsDrawerVisible,
    selectedTaskForLogs,
    logs,
    isLoadingLogs,
    openLogsDrawer,
    closeLogsDrawer,

    classes = defaultStyles
}) => {
    // Form state for editing
    const [editForm] = Form.useForm();
    const [scheduleType, setScheduleType] = useState<"interval" | "cron">("interval");
    const [cronInput, setCronInput] = useState<string>("0 0 * * *");
    const [humanCron, setHumanCron] = useState<string>("");
    const [cronPreset, setCronPreset] = useState<string>("0 0 * * *");

    useEffect(() => {
        if (selectedTaskForEdit) {
            const initialCron = selectedTaskForEdit.cronExpression || "0 0 * * *";
            setScheduleType(selectedTaskForEdit.scheduleType);
            setCronInput(initialCron);

            const matchingPreset = CRON_PRESETS.find(p => p.value === initialCron);
            setCronPreset(matchingPreset ? matchingPreset.value : "custom");

            try {
                setHumanCron(cronstrue.toString(initialCron));
            } catch {
                setHumanCron("Invalid cron expression");
            }

            editForm.setFieldsValue({
                enabled: selectedTaskForEdit.enabled,
                scheduleType: selectedTaskForEdit.scheduleType,
                intervalMinutes: selectedTaskForEdit.intervalMinutes || 60,
                cronExpression: initialCron,
                timezone: selectedTaskForEdit.timezone || "UTC"
            });
        }
    }, [selectedTaskForEdit]);

    const handleCronChange = (value: string) => {
        setCronInput(value);
        try {
            setHumanCron(cronstrue.toString(value));
        } catch {
            setHumanCron("Invalid cron expression");
        }
    };

    const handlePresetChange = (preset: string) => {
        setCronPreset(preset);
        if (preset !== "custom") {
            editForm.setFieldsValue({ cronExpression: preset });
            handleCronChange(preset);
        }
    };

    const onFinishEdit = (values: any) => {
        if (!selectedTaskForEdit) return;
        const payload: IScheduledTaskUpdate = {
            enabled: values.enabled,
            scheduleType: values.scheduleType,
            intervalMinutes: values.scheduleType === "interval" ? values.intervalMinutes : null,
            cronExpression: values.scheduleType === "cron" ? values.cronExpression : null,
            timezone: values.timezone
        };
        saveTaskConfig(selectedTaskForEdit.id, payload);
    };

    // KPI Counters
    const totalCount = tasks.length;
    const enabledCount = tasks.filter(t => t.enabled).length;
    const failedCount = tasks.filter(t => t.lastStatus === "failure").length;
    const successCount = tasks.filter(t => t.lastStatus === "success").length;

    const columns = [
        {
            title: "Task",
            dataIndex: "name",
            key: "name",
            render: (_: any, record: IScheduledTask) => (
                <div>
                    <Space size={6}>
                        <span className={classes.taskName}>{record.name}</span>
                        <Tag color={getModuleColor(record.module)}>{record.module}</Tag>
                    </Space>
                    {record.description && (
                        <div className={classes.taskDescription}>{record.description}</div>
                    )}
                </div>
            )
        },
        {
            title: "Schedule",
            key: "schedule",
            width: 250,
            render: (_: any, record: IScheduledTask) => {
                if (record.scheduleType === "interval") {
                    return (
                        <Tag color="blue">
                            <FontAwesomeIcon icon={faStopwatch} style={{ marginRight: 6 }} />
                            Every {formatInterval(record.intervalMinutes)}
                        </Tag>
                    );
                }

                let humanText = "";
                try {
                    humanText = record.cronExpression ? cronstrue.toString(record.cronExpression) : "";
                } catch {
                    humanText = "";
                }

                return (
                    <div>
                        <Tooltip title={humanText ? `${humanText} (${record.timezone})` : `Timezone: ${record.timezone}`}>
                            <Tag color="purple" className={classes.cronBadge}>
                                <FontAwesomeIcon icon={faClock} style={{ marginRight: 6 }} />
                                {record.cronExpression}
                            </Tag>
                        </Tooltip>
                        {humanText && (
                            <div style={{ fontSize: 11, color: "#8c8c8c", marginTop: 2 }}>
                                {humanText}
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            title: "Status",
            dataIndex: "lastStatus",
            key: "lastStatus",
            width: 170,
            render: (_: any, record: IScheduledTask) => {
                if (runningTaskId === record.id || record.lastStatus === "running") {
                    return (
                        <Tag color="processing">
                            <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: 6 }} />
                            Running
                        </Tag>
                    );
                }
                if (record.lastStatus === "success") {
                    return (
                        <Tag color="success">
                            <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: 6 }} />
                            Success {record.lastDurationMs !== null ? `(${record.lastDurationMs}ms)` : ""}
                        </Tag>
                    );
                }
                if (record.lastStatus === "failure") {
                    return (
                        <Tooltip title="Click to view error stack trace">
                            <Tag
                                color="error"
                                style={{ cursor: "pointer" }}
                                onClick={() => openErrorModal(record)}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: 6 }} />
                                Failure
                            </Tag>
                        </Tooltip>
                    );
                }
                return <Tag color="default">Idle (Never Run)</Tag>;
            }
        },
        {
            title: "Last Run",
            dataIndex: "lastRunAt",
            key: "lastRunAt",
            width: 160,
            render: (lastRunAt: string | null) => {
                if (!lastRunAt) return <Text type="secondary">—</Text>;
                return (
                    <Tooltip title={dayjs(lastRunAt).format("YYYY-MM-DD HH:mm:ss")}>
                        <span>{dayjs(lastRunAt).fromNow()}</span>
                    </Tooltip>
                );
            }
        },
        {
            title: "Next Due",
            dataIndex: "nextRunAt",
            key: "nextRunAt",
            width: 160,
            render: (nextRunAt: string | null, record: IScheduledTask) => {
                if (!record.enabled) return <Text type="secondary">Disabled</Text>;
                if (!nextRunAt) return <Text type="secondary">—</Text>;
                return (
                    <Tooltip title={dayjs(nextRunAt).format("YYYY-MM-DD HH:mm:ss")}>
                        <span>{dayjs(nextRunAt).fromNow()}</span>
                    </Tooltip>
                );
            }
        },
        {
            title: "Enabled",
            dataIndex: "enabled",
            key: "enabled",
            width: 90,
            render: (enabled: boolean, record: IScheduledTask) => (
                <Switch
                    checked={enabled}
                    onChange={(checked) => toggleEnabled(record.id, checked)}
                />
            )
        },
        {
            title: "Actions",
            key: "actions",
            width: 200,
            render: (_: any, record: IScheduledTask) => (
                <Space size={6}>
                    <Button
                        size="small"
                        icon={<FontAwesomeIcon icon={faPlay} />}
                        loading={runningTaskId === record.id}
                        onClick={() => runTask(record.id)}
                    >
                        Run
                    </Button>
                    <Button
                        size="small"
                        icon={<FontAwesomeIcon icon={faList} />}
                        onClick={() => openLogsDrawer(record)}
                    >
                        Logs
                    </Button>
                    <Button
                        size="small"
                        icon={<FontAwesomeIcon icon={faGear} />}
                        onClick={() => openEditModal(record)}
                    >
                        Configure
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.titleSection}>
                    <h1>
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        Scheduled Tasks
                    </h1>
                    <p className={classes.subtitle}>
                        Tasks periodically evaluated and triggered by AWS EventBridge Scheduler
                    </p>
                </div>
                <div className={classes.actions}>
                    <Button
                        icon={<FontAwesomeIcon icon={faArrowsRotate} />}
                        onClick={refresh}
                        loading={isLoading}
                    >
                        Refresh
                    </Button>
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faPlay} />}
                        onClick={() => runAll(false)}
                        loading={isRunningAll}
                    >
                        Run All Due
                    </Button>
                    <Button
                        danger
                        icon={<FontAwesomeIcon icon={faPlay} />}
                        onClick={() => runAll(true)}
                        loading={isRunningAll}
                    >
                        Force Run All
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <Row gutter={16} className={classes.kpiRow}>
                <Col xs={12} sm={6}>
                    <Card size="small" className={classes.kpiCard}>
                        <Text type="secondary">Total Tasks</Text>
                        <div className={classes.kpiValue}>{totalCount}</div>
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card size="small" className={classes.kpiCard}>
                        <Text type="secondary">Active (Enabled)</Text>
                        <div className={classes.kpiValue} style={{ color: "#1890ff" }}>
                            {enabledCount}
                        </div>
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card size="small" className={classes.kpiCard}>
                        <Text type="secondary">Passing Runs</Text>
                        <div className={classes.kpiValue} style={{ color: "#52c41a" }}>
                            {successCount}
                        </div>
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card size="small" className={classes.kpiCard}>
                        <Text type="secondary">Failed Status</Text>
                        <div className={classes.kpiValue} style={{ color: failedCount > 0 ? "#ff4d4f" : "#8c8c8c" }}>
                            {failedCount}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Main Tasks Table */}
            <Card>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={tasks}
                    loading={isLoading}
                    pagination={false}
                />
            </Card>

            {/* Configure Task Modal */}
            <Modal
                title={
                    <Space>
                        <FontAwesomeIcon icon={faGear} />
                        Configure Schedule: {selectedTaskForEdit?.name}
                    </Space>
                }
                open={editModalVisible}
                onCancel={closeEditModal}
                onOk={() => editForm.submit()}
                destroyOnClose
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={onFinishEdit}
                    style={{ marginTop: 16 }}
                >
                    <Form.Item name="enabled" label="Enabled Status" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="scheduleType" label="Schedule Type">
                        <Radio.Group
                            onChange={(e) => setScheduleType(e.target.value)}
                            buttonStyle="solid"
                        >
                            <Radio.Button value="interval">Interval-Based</Radio.Button>
                            <Radio.Button value="cron">Cron-Based</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    {scheduleType === "interval" && (
                        <Form.Item
                            name="intervalMinutes"
                            label="Run Interval (Minutes)"
                            rules={[{ required: true, message: "Please specify interval in minutes" }]}
                            extra="Examples: 15 (Every 15 min), 60 (Every hour), 120 (Every 2 hours), 1440 (Daily)"
                        >
                            <InputNumber min={1} max={10080} style={{ width: "100%" }} />
                        </Form.Item>
                    )}

                    {scheduleType === "cron" && (
                        <>
                            <Form.Item label="Schedule Preset">
                                <Select
                                    value={cronPreset}
                                    options={CRON_PRESETS}
                                    onChange={handlePresetChange}
                                />
                            </Form.Item>

                            <Form.Item
                                name="cronExpression"
                                label="Cron Expression (5-part format)"
                                rules={[{ required: true, message: "Please specify a cron expression" }]}
                                extra="Format: minute hour day-of-month month day-of-week (e.g. 0 0 * * *)"
                            >
                                <Input
                                    value={cronInput}
                                    onChange={(e) => handleCronChange(e.target.value)}
                                    placeholder="0 0 * * *"
                                />
                            </Form.Item>

                            {humanCron && (
                                <div className={classes.cronHelperText}>
                                    <strong>Schedule Translation:</strong> {humanCron}
                                </div>
                            )}

                            <Form.Item
                                name="timezone"
                                label="Timezone"
                                style={{ marginTop: 16 }}
                                rules={[{ required: true, message: "Please select a timezone" }]}
                            >
                                <Select options={COMMON_TIMEZONES} />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>

            {/* Error Details Modal */}
            <Modal
                title={
                    <Space style={{ color: "#ff4d4f" }}>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        Execution Failure: {selectedTaskForError?.name}
                    </Space>
                }
                open={errorModalVisible}
                onCancel={closeErrorModal}
                footer={[
                    <Button
                        key="copy"
                        icon={<FontAwesomeIcon icon={faCopy} />}
                        onClick={() => {
                            if (selectedTaskForError?.lastError) {
                                navigator.clipboard.writeText(selectedTaskForError.lastError);
                                notification.success({
                                    message: "Copied",
                                    description: "Error copied to clipboard"
                                });
                            }
                        }}
                    >
                        Copy Error
                    </Button>,
                    <Button key="close" type="primary" onClick={closeErrorModal}>
                        Close
                    </Button>
                ]}
                width={700}
            >
                {selectedTaskForError && (
                    <div>
                        <p>
                            <strong>Failed At:</strong>{" "}
                            {selectedTaskForError.lastRunAt
                                ? dayjs(selectedTaskForError.lastRunAt).format("YYYY-MM-DD HH:mm:ss")
                                : "Unknown"}
                        </p>
                        {selectedTaskForError.lastDurationMs !== null && (
                            <p>
                                <strong>Execution Duration:</strong> {selectedTaskForError.lastDurationMs}ms
                            </p>
                        )}
                        <Paragraph strong style={{ marginTop: 12 }}>
                            Stack Trace / Error Message:
                        </Paragraph>
                        <div className={classes.errorStackTrace}>
                            {selectedTaskForError.lastError || "No detailed error message recorded."}
                        </div>
                    </div>
                )}
            </Modal>

            {/* Execution History / Logs Drawer */}
            <Drawer
                title={
                    <Space>
                        <FontAwesomeIcon icon={faList} />
                        Execution History: {selectedTaskForLogs?.name}
                    </Space>
                }
                placement="right"
                width={650}
                open={logsDrawerVisible}
                onClose={closeLogsDrawer}
            >
                <Table
                    rowKey="id"
                    loading={isLoadingLogs}
                    dataSource={logs}
                    pagination={{ pageSize: 15 }}
                    size="small"
                    columns={[
                        {
                            title: "Started",
                            dataIndex: "startedAt",
                            key: "startedAt",
                            render: (date: string) => dayjs(date).format("MM/DD HH:mm:ss")
                        },
                        {
                            title: "Duration",
                            dataIndex: "durationMs",
                            key: "durationMs",
                            render: (ms: number) => `${ms}ms`
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (status: string) =>
                                status === "success" ? (
                                    <Tag color="success">Success</Tag>
                                ) : (
                                    <Tag color="error">Failure</Tag>
                                )
                        },
                        {
                            title: "Trigger",
                            dataIndex: "triggeredBy",
                            key: "triggeredBy",
                            render: (trig: string) => <Tag>{trig}</Tag>
                        },
                        {
                            title: "Result / Message",
                            dataIndex: "message",
                            key: "message",
                            render: (_: any, record: IScheduledTaskLog) => {
                                if (record.status === "failure" && record.error) {
                                    return (
                                        <Text type="danger" ellipsis={{ tooltip: record.error }}>
                                            {record.error.split("\n")[0]}
                                        </Text>
                                    );
                                }
                                return record.message || "—";
                            }
                        }
                    ]}
                />
            </Drawer>
        </div>
    );
};
