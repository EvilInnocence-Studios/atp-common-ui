import { IMedia } from "@common-shared/media/types";
import { Setter } from "unstateless";

export declare interface IMediaManagerProps {
    images: IMedia[];
    isLoading: boolean;
    upload: (file: File) => void;
    overwrite: boolean;
    setOverwrite: Setter<boolean>;
    query: string;
    setQuery: Setter<string>;
    refresh: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaManagerInputProps {
    classes?: any;
}

export type MediaManagerProps = IMediaManagerInputProps & IMediaManagerProps;