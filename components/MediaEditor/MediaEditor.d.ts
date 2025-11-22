import { IMedia } from "@common-shared/media/types";
import { IUpdater } from "@core/lib/useUpdater";

export declare interface IMediaEditorProps extends IUpdater<IMedia> {
    image: IMedia;
    remove: () => void;
    upload: (file: File) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaEditorInputProps {
    imageId: string;
    onDelete: () => void;
    classes?: any;
}

export type MediaEditorProps = IMediaEditorInputProps & IMediaEditorProps;