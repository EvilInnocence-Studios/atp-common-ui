import { IMedia } from "@common-shared/media/types";

export declare interface IMediaManagerProps {
    images: IMedia[];
    isLoading: boolean;
    upload: (file: File) => void;
    overwrite: boolean;
    setOverwrite: Setter<boolean>;
    refresh: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaManagerInputProps {

}

export type MediaManagerProps = IMediaManagerInputProps & IMediaManagerProps;