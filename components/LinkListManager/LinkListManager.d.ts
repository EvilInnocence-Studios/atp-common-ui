import { ILink, ILinkList } from "@common-shared/link/types";
import { Setter } from "unstateless";

export interface ILinkListExportItem {
    name: string;
    key: string;
    links: Array<{
        text: string;
        url: string;
        subMenuKey: string | null;
        order: number;
    }>;
}

export interface ILinkListConflictItem {
    incoming: ILinkListExportItem;
    existing: ILinkList & {
        links?: ILink[];
    };
}

export type LinkListConflictAction = "overwrite" | "skip" | "rename";

export interface ILinkListConflictResolution {
    action: LinkListConflictAction;
    newKey?: string;
}

export interface ILinkListConflictState {
    conflicts: ILinkListConflictItem[];
    nonConflicts: ILinkListExportItem[];
    currentIndex: number;
    resolutions: ILinkListConflictResolution[];
}

export declare interface ILinkListManagerProps {
    lists: ILinkList[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    listKey: string;
    setListKey: Setter<string>;
    selectedList: string | null;
    setSelectedList: Setter<string | null>;
    create: () => void;
    update: (id: string, field: string) => (value: any) => void;
    remove: (id: string) => () => void;
    selectedRowKeys: string[];
    setSelectedRowKeys: (keys: string[]) => void;
    conflictState: ILinkListConflictState | null;
    onExport: () => void;
    onImportFile: (file: File) => void;
    resolveConflict: (action: "overwrite" | "skip" | "overwriteAll" | "skipAll" | "rename", newKey?: string) => void;
    cancelConflict: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ILinkListManagerInputProps {
    classes?: any;
}

export type LinkListManagerProps = ILinkListManagerInputProps & ILinkListManagerProps;