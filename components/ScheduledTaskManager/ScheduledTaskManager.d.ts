import {
    IScheduledTask,
    IScheduledTaskLog,
    IScheduledTaskUpdate
} from "@common-shared/scheduledTask/types";

export interface IScheduledTaskManagerInputProps {
    classes?: Record<string, string>;
}

export interface IScheduledTaskManagerProps {
    tasks: IScheduledTask[];
    isLoading: boolean;
    refresh: () => void;
    toggleEnabled: (id: string, enabled: boolean) => Promise<void>;
    runTask: (id: string) => Promise<void>;
    runAll: (force?: boolean) => Promise<void>;
    runningTaskId: string | null;
    isRunningAll: boolean;

    // Configure Modal
    editModalVisible: boolean;
    selectedTaskForEdit: IScheduledTask | null;
    openEditModal: (task: IScheduledTask) => void;
    closeEditModal: () => void;
    saveTaskConfig: (id: string, data: IScheduledTaskUpdate) => Promise<void>;

    // Error Modal
    errorModalVisible: boolean;
    selectedTaskForError: IScheduledTask | null;
    openErrorModal: (task: IScheduledTask) => void;
    closeErrorModal: () => void;

    // Logs Drawer
    logsDrawerVisible: boolean;
    selectedTaskForLogs: IScheduledTask | null;
    logs: IScheduledTaskLog[];
    isLoadingLogs: boolean;
    openLogsDrawer: (task: IScheduledTask) => void;
    closeLogsDrawer: () => void;

    classes?: Record<string, string>;
}

export type ScheduledTaskManagerProps = IScheduledTaskManagerProps;
