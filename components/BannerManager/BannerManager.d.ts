import { IBanner } from "@common-shared/banner/types";
import { Setter } from "unstateless";

export declare interface IBannerManagerProps {
    banners: IBanner[];
    isLoading: boolean;
    upload: (file: File) => void;
    overwrite: boolean;
    setOverwrite: Setter<boolean>;
    refresh: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IBannerManagerInputProps {
    classes?: any;
}

export type BannerManagerProps = IBannerManagerInputProps & IBannerManagerProps;