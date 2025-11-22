import { IBanner } from "@common-shared/banner/types";

export declare interface IBannerImageProps {
    banner: IBanner | null;
    isLoading: boolean;
    imgHost: string;
    imgFolder: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IBannerImageInputProps {
    bannerId: string;
    classes?: any;
}

export type BannerImageProps = IBannerImageInputProps & IBannerImageProps;