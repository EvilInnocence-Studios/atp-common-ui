import {
    IScheduledTask,
    IScheduledTaskLog,
    IScheduledTaskUpdate
} from "@common-shared/scheduledTask/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ScheduledTaskManagerComponent } from "./ScheduledTaskManager.component";
import {
    IScheduledTaskManagerInputProps,
    IScheduledTaskManagerProps,
    ScheduledTaskManagerProps
} from "./ScheduledTaskManager.d";

const injectScheduledTaskManagerProps = createInjector(
    (inputProps: IScheduledTaskManagerInputProps): IScheduledTaskManagerProps => {
        const [tasks, setTasks] = useState<IScheduledTask[]>([]);
        const [runningTaskId, setRunningTaskId] = useState<string | null>(null);
        const [isRunningAll, setIsRunningAll] = useState<boolean>(false);

        // Edit Modal State
        const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
        const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<IScheduledTask | null>(null);

        // Error Modal State
        const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
        const [selectedTaskForError, setSelectedTaskForError] = useState<IScheduledTask | null>(null);

        // Logs Drawer State
        const [logsDrawerVisible, setLogsDrawerVisible] = useState<boolean>(false);
        const [selectedTaskForLogs, setSelectedTaskForLogs] = useState<IScheduledTask | null>(null);
        const [logs, setLogs] = useState<IScheduledTaskLog[]>([]);
        const [isLoadingLogs, setIsLoadingLogs] = useState<boolean>(false);

        const loader = useLoaderAsync();

        const refresh = () => {
            loader(async () => {
                try {
                    const data = await services().scheduledTask.search();
                    setTasks(data || []);
                } catch (err: any) {
                    notification.error({
                        message: "Failed to load scheduled tasks",
                        description: err.message
                    });
                }
            });
        };

        useEffect(() => {
            refresh();
        }, []);

        const toggleEnabled = async (id: string, enabled: boolean) => {
            try {
                // Optimistic UI update
                setTasks(prev => prev.map(t => t.id === id ? { ...t, enabled } : t));
                await services().scheduledTask.update(id, { enabled });
                notification.success({
                    message: "Task Updated",
                    description: `Task ${enabled ? "enabled" : "disabled"}`
                });
                refresh();
            } catch (err: any) {
                notification.error({
                    message: "Failed to update task",
                    description: err.message
                });
                refresh();
            }
        };

        const runTask = async (id: string) => {
            setRunningTaskId(id);
            try {
                const res = await services().scheduledTask.run(id);
                if (res.status === "success") {
                    notification.success({
                        message: "Task Executed",
                        description: `Task executed successfully (${res.durationMs}ms)`
                    });
                } else {
                    notification.error({
                        message: "Task Execution Failed",
                        description: res.error || "Unknown error"
                    });
                }
                refresh();
            } catch (err: any) {
                notification.error({
                    message: "Error running task",
                    description: err.message
                });
                refresh();
            } finally {
                setRunningTaskId(null);
            }
        };

        const runAll = async (force = false) => {
            setIsRunningAll(true);
            try {
                const res = await services().scheduledTask.runAll(force);
                notification.success({
                    message: "Scheduled Tasks Executed",
                    description: `Evaluated ${res.evaluated} tasks: ${res.executed} executed, ${res.skipped} skipped`
                });
                refresh();
            } catch (err: any) {
                notification.error({
                    message: "Error running scheduled tasks",
                    description: err.message
                });
            } finally {
                setIsRunningAll(false);
            }
        };

        const openEditModal = (task: IScheduledTask) => {
            setSelectedTaskForEdit(task);
            setEditModalVisible(true);
        };

        const closeEditModal = () => {
            setEditModalVisible(false);
            setSelectedTaskForEdit(null);
        };

        const saveTaskConfig = async (id: string, data: IScheduledTaskUpdate) => {
            try {
                await services().scheduledTask.update(id, data);
                notification.success({
                    message: "Configuration Saved",
                    description: "Task configuration updated successfully"
                });
                closeEditModal();
                refresh();
            } catch (err: any) {
                notification.error({
                    message: "Failed to save configuration",
                    description: err.message
                });
            }
        };

        const openErrorModal = (task: IScheduledTask) => {
            setSelectedTaskForError(task);
            setErrorModalVisible(true);
        };

        const closeErrorModal = () => {
            setErrorModalVisible(false);
            setSelectedTaskForError(null);
        };

        const openLogsDrawer = async (task: IScheduledTask) => {
            setSelectedTaskForLogs(task);
            setLogsDrawerVisible(true);
            setIsLoadingLogs(true);
            try {
                const fetchedLogs = await services().scheduledTask.getLogs(task.id);
                setLogs(fetchedLogs || []);
            } catch (err: any) {
                notification.error({
                    message: "Failed to load logs",
                    description: err.message
                });
            } finally {
                setIsLoadingLogs(false);
            }
        };

        const closeLogsDrawer = () => {
            setLogsDrawerVisible(false);
            setSelectedTaskForLogs(null);
            setLogs([]);
        };

        return {
            tasks,
            isLoading: loader.isLoading,
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

            classes: inputProps.classes
        };
    }
);

const connect = inject<IScheduledTaskManagerInputProps, ScheduledTaskManagerProps>(
    mergeProps(injectScheduledTaskManagerProps)
);

export const connectScheduledTaskManager = connect;
export const ScheduledTaskManager = overridable<IScheduledTaskManagerInputProps>(
    connect(ScheduledTaskManagerComponent)
);
