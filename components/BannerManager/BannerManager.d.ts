import { IBanner } from "@common-shared/banner/types";

export declare interface IBannerManagerProps {
    banners: IBanner[];
    isLoading: boolean;
    upload: (file: File) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IBannerManagerInputProps {

}

export type BannerManagerProps = IBannerManagerInputProps & IBannerManagerProps;