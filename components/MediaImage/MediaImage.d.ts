import { IMedia } from "@common-shared/media/types";

export declare interface IMediaImageProps {
    image: IMedia | null;
    isLoading: boolean;
    fullUrl: string;
}

// One and only one of imageId or settingKey should be provided
type ImageIdOrSetting =
    | { imageId: string; settingKey?: never }
    | { settingKey: string; imageId?: never };

// What gets passed into the component from the parent as attributes
export declare type IMediaImageInputProps = ImageIdOrSetting & {
    classes?: any;
};

export type MediaImageProps = IMediaImageInputProps & IMediaImageProps;