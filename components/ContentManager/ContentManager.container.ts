import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { ContentManagerComponent } from "./ContentManager.component";
import { ContentManagerProps, IConflictItem, IConflictResolution, IConflictState, IContentManagerInputProps, IContentManagerProps } from "./ContentManager.d";

export const saveJsonFile = async (data: any, defaultFilename: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    if (typeof window !== "undefined" && "showSaveFilePicker" in window) {
        try {
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: defaultFilename,
                types: [{
                    description: "JSON file",
                    accept: { "application/json": [".json"] }
                }]
            });
            const writable = await handle.createWritable();
            await writable.write(jsonString);
            await writable.close();
            return;
        } catch (err: any) {
            if (err?.name === "AbortError") {
                return;
            }
        }
    }
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = defaultFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const injectContentManagerProps = createInjector(({type}:IContentManagerInputProps):IContentManagerProps => {
    const [pages, setPages] = useState<IContent[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [conflictState, setConflictState] = useState<IConflictState | null>(null);
    const loader = useLoaderAsync();
    const navigate = useNavigate();

    const refresh = () => {
        loader(() => services().content.search({ type })
            .then(data => {
                const sorted = [...data].sort((a, b) => {
                    if (type === 'page') {
                        return (a.title || '').localeCompare(b.title || '');
                    } else {
                        if (!a.enabled && b.enabled) return -1;
                        if (a.enabled && !b.enabled) return 1;
                        const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
                        const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
                        return dateB - dateA;
                    }
                });
                setPages(sorted);
                setSelectedRowKeys(prev => prev.filter(key => sorted.some(p => p.id === key)));
            })
        );
    }

    const goToContent = (content:IContent) => {
        refresh();
        navigate(`/${content.type}s/${content.id}`, {});
    }

    useEffect(refresh, []);

    const create = () => {
        loader(() => services().content.create({
            type,
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            slug: `new-${type}-${Date.now()}`,
            content: `This is a new ${type}.`,
            layout: null,
            format: 'markdown',
            enabled: false,
        }).then(goToContent));
    }

    const doExport = async (records: IContent[]) => {
        if (records.length === 0) return;
        const exportData = records.map(record => {
            const { id, ...rest } = record;
            return rest;
        });
        const filename = `${type}s-${new Date().toISOString().slice(0, 10)}.json`;
        await saveJsonFile(exportData, filename);
        notification.success({
            message: "Export Complete",
            description: `Exported ${exportData.length} ${type}(s).`,
        });
    };

    const onExport = () => {
        if (selectedRowKeys.length > 0) {
            const selectedPages = pages.filter(p => selectedRowKeys.includes(p.id));
            doExport(selectedPages);
        } else {
            if (pages.length === 0) {
                notification.warning({
                    message: "Export",
                    description: `No ${type}s available to export.`,
                });
                return;
            }
            Modal.confirm({
                title: "Export Records",
                content: `No records are currently selected with checkboxes. Would you like to export all ${pages.length} records?`,
                okText: "Export All",
                cancelText: "Cancel",
                onOk: () => {
                    doExport(pages);
                },
            });
        }
    };

    const finishImport = (
        nonConflicts: any[],
        conflicts: IConflictItem[],
        resolutions: IConflictResolution[]
    ) => {
        setConflictState(null);

        loader(async () => {
            let createdCount = 0;
            let overwrittenCount = 0;
            let skippedCount = 0;

            try {
                // 1. Create all non-conflicting new records
                for (const item of nonConflicts) {
                    await services().content.create(item);
                    createdCount++;
                }

                // 2. Process conflicts based on resolutions
                for (let i = 0; i < conflicts.length; i++) {
                    const conflict = conflicts[i];
                    const resolution = resolutions[i];

                    if (resolution.action === "overwrite") {
                        const { id, ...dataToSave } = conflict.incoming;
                        await services().content.update(conflict.existing.id, dataToSave);
                        overwrittenCount++;
                    } else if (resolution.action === "rename") {
                        const { id, ...dataToSave } = conflict.incoming;
                        await services().content.create({
                            ...dataToSave,
                            slug: resolution.newSlug || conflict.incoming.slug,
                        });
                        createdCount++;
                    } else {
                        skippedCount++;
                    }
                }

                notification.success({
                    message: "Import Complete",
                    description: `Import completed: ${createdCount} created, ${overwrittenCount} overwritten, ${skippedCount} skipped.`,
                });
                setSelectedRowKeys([]);
                refresh();
            } catch (err: any) {
                notification.error({
                    message: "Import Error",
                    description: err?.message || "An error occurred during import.",
                });
                refresh();
            }
        });
    };

    const resolveConflict = (action: "overwrite" | "skip" | "overwriteAll" | "skipAll" | "rename", newSlug?: string) => {
        if (!conflictState) return;

        const { conflicts, nonConflicts, currentIndex, resolutions } = conflictState;

        if (action === "overwriteAll") {
            const finalResolutions: IConflictResolution[] = [...resolutions];
            for (let i = currentIndex; i < conflicts.length; i++) {
                finalResolutions[i] = { action: "overwrite" };
            }
            finishImport(nonConflicts, conflicts, finalResolutions);
            return;
        }

        if (action === "skipAll") {
            const finalResolutions: IConflictResolution[] = [...resolutions];
            for (let i = currentIndex; i < conflicts.length; i++) {
                finalResolutions[i] = { action: "skip" };
            }
            finishImport(nonConflicts, conflicts, finalResolutions);
            return;
        }

        const nextResolutions: IConflictResolution[] = [...resolutions];
        if (action === "rename") {
            nextResolutions[currentIndex] = { action: "rename", newSlug: newSlug?.trim() };
        } else {
            nextResolutions[currentIndex] = { action };
        }

        if (currentIndex + 1 < conflicts.length) {
            setConflictState({
                ...conflictState,
                currentIndex: currentIndex + 1,
                resolutions: nextResolutions,
            });
        } else {
            finishImport(nonConflicts, conflicts, nextResolutions);
        }
    };

    const cancelConflict = () => {
        setConflictState(null);
        notification.info({
            message: "Import Cancelled",
            description: "The import was cancelled. No changes were made.",
        });
    };

    const onImportFile = async (file: File) => {
        let text = "";
        try {
            text = await file.text();
        } catch {
            notification.error({
                message: "Import Error",
                description: "Failed to read the selected file.",
            });
            return;
        }

        let parsed: any;
        try {
            parsed = JSON.parse(text);
        } catch {
            notification.error({
                message: "Import Error",
                description: "The selected file is not valid JSON.",
            });
            return;
        }

        const rawList = Array.isArray(parsed) ? parsed : [parsed];
        if (rawList.length === 0) {
            notification.warning({
                message: "Import Warning",
                description: "The selected file contains no records.",
            });
            return;
        }

        const preparedRecords = rawList.map((item, index) => {
            const { id, ...rest } = item;
            return {
                ...rest,
                type: rest.type || type,
                slug: rest.slug ? String(rest.slug).trim() : `imported-${type}-${Date.now()}-${index}`,
                format: rest.format === "layout" ? "layout" : "markdown",
                content: rest.content !== undefined ? String(rest.content) : "",
                enabled: Boolean(rest.enabled),
            };
        });

        loader(async () => {
            try {
                const currentRecords = await services().content.search({ type });
                const conflicts: IConflictItem[] = [];
                const nonConflicts: any[] = [];
                const seenSlugs = new Set<string>();

                for (const record of preparedRecords) {
                    const existing = currentRecords.find(p => p.slug === record.slug);
                    if (existing) {
                        conflicts.push({ incoming: record, existing });
                    } else if (!seenSlugs.has(record.slug)) {
                        seenSlugs.add(record.slug);
                        nonConflicts.push(record);
                    } else {
                        const earlier = nonConflicts.find(p => p.slug === record.slug);
                        if (earlier) {
                            conflicts.push({ incoming: record, existing: earlier });
                        }
                    }
                }

                if (conflicts.length === 0) {
                    let createdCount = 0;
                    for (const item of nonConflicts) {
                        await services().content.create(item);
                        createdCount++;
                    }
                    notification.success({
                        message: "Import Complete",
                        description: `Successfully imported ${createdCount} new ${type}(s).`,
                    });
                    setSelectedRowKeys([]);
                    refresh();
                } else {
                    setConflictState({
                        conflicts,
                        nonConflicts,
                        currentIndex: 0,
                        resolutions: [],
                    });
                }
            } catch (err: any) {
                notification.error({
                    message: "Import Error",
                    description: err?.message || "An error occurred while preparing import.",
                });
            }
        });
    };

    return {
        pages,
        isLoading: loader.isLoading,
        selectedRowKeys,
        setSelectedRowKeys,
        conflictState,
        create,
        refresh,
        onExport,
        onImportFile,
        resolveConflict,
        cancelConflict,
    };
});

const connect = inject<IContentManagerInputProps, ContentManagerProps>(mergeProps(
    injectContentManagerProps,
));
export const connectContentManager = connect;

export const ContentManager = overridable<IContentManagerInputProps>(connect(ContentManagerComponent));

