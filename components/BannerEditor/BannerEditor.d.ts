import { IBanner } from "@common-shared/banner/types";
import { IUpdater } from "@core/lib/useUpdater";

export declare interface IBannerEditorProps extends IUpdater<IBanner> {
    banner: IBanner;
}

// What gets passed into the component from the parent as attributes
export declare interface IBannerEditorInputProps {
    bannerId: number;
}

export type BannerEditorProps = IBannerEditorInputProps & IBannerEditorProps;