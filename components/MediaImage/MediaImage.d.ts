import { IMedia } from "@common-shared/media/types";

export declare interface IMediaImageProps {
    image: IMedia | null;
    isLoading: boolean;
    fullUrl: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaImageInputProps {
    imageId?: string;
    linkUrl?: string;
    settingKey?: string;
    classes?: any;
    css?: string;
    className?: string;
    isBackgroundImage?:boolean;
    imageUrlVarName?:string;
};

export type MediaImageProps = IMediaImageInputProps & IMediaImageProps;