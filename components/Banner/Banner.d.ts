import { IBanner } from "@common-shared/banner/types";

export declare interface IBannerProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IBannerInputProps {
    banner:IBanner;
    className?: string;
}

export type BannerProps = IBannerInputProps & IBannerProps;