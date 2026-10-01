import { IContent } from "@common-shared/content/types";
import React from "react";

export interface IConflictItem {
    incoming: any;
    existing: IContent;
}

export type ConflictResolutionAction = "overwrite" | "skip" | "rename";

export interface IConflictResolution {
    action: ConflictResolutionAction;
    newSlug?: string;
}

export interface IConflictState {
    conflicts: IConflictItem[];
    nonConflicts: any[];
    currentIndex: number;
    resolutions: IConflictResolution[];
}

export declare interface IContentManagerProps {
    pages: IContent[];
    isLoading: boolean;
    selectedRowKeys: React.Key[];
    setSelectedRowKeys: (keys: React.Key[]) => void;
    conflictState: IConflictState | null;
    create: () => void;
    refresh: () => void;
    onExport: () => void;
    onImportFile: (file: File) => void;
    resolveConflict: (action: "overwrite" | "skip" | "overwriteAll" | "skipAll" | "rename", newSlug?: string) => void;
    cancelConflict: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IContentManagerInputProps {
    type: "page" | "post";
    classes?: any;
}

export type ContentManagerProps = IContentManagerInputProps & IContentManagerProps;