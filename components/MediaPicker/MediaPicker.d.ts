import { IMedia } from "@common-shared/media/types";
import { Setter } from "unstateless";

export declare interface IMediaPickerProps {
    isModalVisible: boolean;
    setIsModalVisible: Setter<boolean>;
    images: IMedia[];
    query: string;
    setQuery: Setter<string>;
    upload: (file: File) => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaPickerInputProps {
    classes?: any;
    imageId?: string;
    settingKey?: string;
    onSelect: (imageId: string) => void;
}

export type MediaPickerProps = IMediaPickerInputProps & IMediaPickerProps;