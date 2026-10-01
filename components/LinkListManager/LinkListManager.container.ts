import { ILinkList } from "@common-shared/link/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { appendTo, clear } from "@core/lib/util";
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { LinkListManagerComponent } from "./LinkListManager.component";
import {
    ILinkListConflictItem,
    ILinkListConflictResolution,
    ILinkListConflictState,
    ILinkListExportItem,
    ILinkListManagerInputProps,
    ILinkListManagerProps,
    LinkListManagerProps
} from "./LinkListManager.d";

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

const injectLinkListManagerProps = createInjector(({}:ILinkListManagerInputProps):ILinkListManagerProps => {
    const [lists, setLists] = useState<ILinkList[]>([]);
    const [selectedList, setSelectedList] = useState<string | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [conflictState, setConflictState] = useState<ILinkListConflictState | null>(null);
    const loader = useLoaderAsync();

    const list = services().linkList;

    const update = (id:string, field:string) => (value:any) => {
        const oldLists = lists;
        setLists(lists.map(l => l.id === id ? {...l, [field]: value} : l));
        loader(() => list.update(id, {[field]: value})
            .then(flash.success("Link list updated"))
            .catch(all(() => setLists(oldLists), flash.error("Failed to update link list")))
        );
    }

    const remove = (id:string) => () => {
        const oldLists = lists;
        setLists(lists.filter(l => l.id !== id));
        setSelectedRowKeys(prev => prev.filter(k => k !== id));
        loader(() => list.remove(id)
            .then(flash.success("List removed"))
            .catch(all(() => setLists(oldLists), flash.error("Failed to remove link list")))
        );
    }

    const [name, setName] = useState('');
    const [listKey, setListKey] = useState('');
    const create = () => {
        loader(() => list.create({name, key: listKey})
            .then(appendTo(lists))
            .then(all(
                refresh,
                flash.success(`Link list ${name} created`),
                clear(setName),
                clear(setListKey),
            ))
            .catch(flash.error("Failed to create link list"))
        );
    }

    const refresh = () => {
        loader(() => list.search()
            .then(data => {
                setLists(data);
                setSelectedRowKeys(prev => prev.filter(k => data.some(l => l.id === k)));
            })
            .catch(flash.error("Failed to load link lists"))
        );
    };
    useEffect(refresh, []);

    const doExport = async (targetLists: ILinkList[]) => {
        if (targetLists.length === 0) return;
        loader(async () => {
            try {
                const exportData: ILinkListExportItem[] = await Promise.all(
                    targetLists.map(async (l) => {
                        const childLinks = await services().linkList.link.search(l.id);
                        const cleanLinks = (childLinks || []).map(link => ({
                            text: link.text,
                            url: link.url,
                            subMenuKey: link.subMenuKey || null,
                            order: link.order,
                        }));
                        return {
                            name: l.name,
                            key: l.key,
                            links: cleanLinks,
                        };
                    })
                );
                const filename = `link-lists-${new Date().toISOString().slice(0, 10)}.json`;
                await saveJsonFile(exportData, filename);
                notification.success({
                    message: "Export Complete",
                    description: `Exported ${exportData.length} link list(s) with associated child links.`,
                });
            } catch (err: any) {
                notification.error({
                    message: "Export Failed",
                    description: err?.message || "Failed to export link lists.",
                });
            }
        });
    };

    const onExport = () => {
        if (selectedRowKeys.length > 0) {
            const selectedLists = lists.filter(l => selectedRowKeys.includes(l.id));
            doExport(selectedLists);
        } else {
            if (lists.length === 0) {
                notification.warning({
                    message: "Export",
                    description: "No link lists available to export.",
                });
                return;
            }
            Modal.confirm({
                title: "Export Link Lists",
                content: `No link lists are currently selected with checkboxes. Would you like to export all ${lists.length} link lists?`,
                okText: "Export All",
                cancelText: "Cancel",
                onOk: () => {
                    doExport(lists);
                },
            });
        }
    };

    const finishImport = (
        nonConflicts: ILinkListExportItem[],
        conflicts: ILinkListConflictItem[],
        resolutions: ILinkListConflictResolution[]
    ) => {
        setConflictState(null);

        loader(async () => {
            let createdCount = 0;
            let overwrittenCount = 0;
            let skippedCount = 0;

            try {
                // 1. Create all non-conflicting link lists with child links
                for (const item of nonConflicts) {
                    const created = await services().linkList.create({ name: item.name, key: item.key });
                    if (item.links && item.links.length > 0) {
                        for (const l of item.links) {
                            await services().linkList.link.create(created.id, l);
                        }
                    }
                    createdCount++;
                }

                // 2. Process conflicts based on resolutions
                for (let i = 0; i < conflicts.length; i++) {
                    const conflict = conflicts[i];
                    const resolution = resolutions[i];

                    if (resolution.action === "overwrite") {
                        // Update link list metadata
                        await services().linkList.update(conflict.existing.id, {
                            name: conflict.incoming.name,
                            key: conflict.incoming.key,
                        });

                        // Replace child links: remove existing child links, then create incoming ones
                        const existingLinks = await services().linkList.link.search(conflict.existing.id);
                        for (const el of existingLinks || []) {
                            await services().linkList.link.remove(conflict.existing.id, el.id);
                        }
                        if (conflict.incoming.links && conflict.incoming.links.length > 0) {
                            for (const l of conflict.incoming.links) {
                                await services().linkList.link.create(conflict.existing.id, l);
                            }
                        }
                        overwrittenCount++;
                    } else if (resolution.action === "rename") {
                        const newKey = resolution.newKey || conflict.incoming.key;
                        const created = await services().linkList.create({
                            name: conflict.incoming.name,
                            key: newKey,
                        });
                        if (conflict.incoming.links && conflict.incoming.links.length > 0) {
                            for (const l of conflict.incoming.links) {
                                await services().linkList.link.create(created.id, l);
                            }
                        }
                        createdCount++;
                    } else {
                        skippedCount++;
                    }
                }

                notification.success({
                    message: "Import Complete",
                    description: `Import completed: ${createdCount} created (including renamed), ${overwrittenCount} overwritten, ${skippedCount} skipped.`,
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

    const resolveConflict = (action: "overwrite" | "skip" | "overwriteAll" | "skipAll" | "rename", newKey?: string) => {
        if (!conflictState) return;

        const { conflicts, nonConflicts, currentIndex, resolutions } = conflictState;

        if (action === "overwriteAll") {
            const finalResolutions: ILinkListConflictResolution[] = [...resolutions];
            for (let i = currentIndex; i < conflicts.length; i++) {
                finalResolutions[i] = { action: "overwrite" };
            }
            finishImport(nonConflicts, conflicts, finalResolutions);
            return;
        }

        if (action === "skipAll") {
            const finalResolutions: ILinkListConflictResolution[] = [...resolutions];
            for (let i = currentIndex; i < conflicts.length; i++) {
                finalResolutions[i] = { action: "skip" };
            }
            finishImport(nonConflicts, conflicts, finalResolutions);
            return;
        }

        const nextResolutions: ILinkListConflictResolution[] = [...resolutions];
        if (action === "rename") {
            nextResolutions[currentIndex] = { action: "rename", newKey: newKey?.trim() };
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
                description: "The selected file contains no link lists.",
            });
            return;
        }

        const preparedLists: ILinkListExportItem[] = rawList.map((item, index) => {
            const { id, ...rest } = item;
            const links = Array.isArray(rest.links)
                ? rest.links.map((link: any, linkIdx: number) => {
                    const { id: linkId, listId, ...linkRest } = link;
                    return {
                        text: linkRest.text || `Link ${linkIdx + 1}`,
                        url: linkRest.url || '#',
                        subMenuKey: linkRest.subMenuKey || null,
                        order: typeof linkRest.order === 'number' ? linkRest.order : linkIdx + 1,
                    };
                })
                : [];

            return {
                name: rest.name || `Imported List ${index + 1}`,
                key: rest.key ? String(rest.key).trim() : `imported-list-${Date.now()}-${index}`,
                links,
            };
        });

        loader(async () => {
            try {
                const currentLists = await services().linkList.search();
                const conflicts: ILinkListConflictItem[] = [];
                const nonConflicts: ILinkListExportItem[] = [];
                const seenKeys = new Set<string>();

                for (const l of preparedLists) {
                    const existing = currentLists.find(ex => ex.key === l.key);
                    if (existing) {
                        const existingLinks = await services().linkList.link.search(existing.id);
                        conflicts.push({
                            incoming: l,
                            existing: {
                                ...existing,
                                links: existingLinks || [],
                            },
                        });
                    } else if (!seenKeys.has(l.key)) {
                        seenKeys.add(l.key);
                        nonConflicts.push(l);
                    } else {
                        const earlier = nonConflicts.find(ex => ex.key === l.key);
                        if (earlier) {
                            conflicts.push({
                                incoming: l,
                                existing: {
                                    id: "duplicate-in-file",
                                    name: earlier.name,
                                    key: earlier.key,
                                    links: earlier.links as any,
                                },
                            });
                        }
                    }
                }

                if (conflicts.length === 0) {
                    let createdCount = 0;
                    for (const item of nonConflicts) {
                        const created = await services().linkList.create({ name: item.name, key: item.key });
                        if (item.links && item.links.length > 0) {
                            for (const child of item.links) {
                                await services().linkList.link.create(created.id, child);
                            }
                        }
                        createdCount++;
                    }
                    notification.success({
                        message: "Import Complete",
                        description: `Successfully imported ${createdCount} link list(s) with child links.`,
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
        lists, isLoading: loader.isLoading,
        name, setName,
        listKey, setListKey,
        create, update, remove, selectedList, setSelectedList,
        selectedRowKeys, setSelectedRowKeys,
        conflictState,
        onExport, onImportFile,
        resolveConflict, cancelConflict,
    };
});

const connect = inject<ILinkListManagerInputProps, LinkListManagerProps>(mergeProps(
    injectLinkListManagerProps,
));
export const connectLinkListManager = connect;

export const LinkListManager = overridable<ILinkListManagerInputProps>(connect(LinkListManagerComponent));

