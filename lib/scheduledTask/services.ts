import {
    IScheduledTask,
    IScheduledTaskLog,
    IScheduledTaskRunResult,
    IScheduledTasksBatchResult,
    IScheduledTaskUpdate
} from "@common-shared/scheduledTask/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { memoize } from "ts-functional";

export const scheduledTaskServices = memoize(({ get, post, patch }: IMethods) => ({
    scheduledTask: {
        search: (): Promise<IScheduledTask[]> => get("scheduled-tasks").then(getResults),
        get: (id: string): Promise<IScheduledTask> => get(`scheduled-tasks/${id}`).then(getResults),
        update: (id: string, data: IScheduledTaskUpdate): Promise<IScheduledTask> =>
            patch(`scheduled-tasks/${id}`, data).then(getResults),
        run: (id: string): Promise<IScheduledTaskRunResult> =>
            post(`scheduled-tasks/${id}/run`).then(getResults),
        runAll: (force = false): Promise<IScheduledTasksBatchResult> =>
            post("scheduled-tasks", { force }).then(getResults),
        getLogs: (id: string, limit = 50, offset = 0): Promise<IScheduledTaskLog[]> =>
            get(`scheduled-tasks/${id}/logs?limit=${limit}&offset=${offset}`).then(getResults),
    }
}), {});
