export declare interface IBannerListProps {
    banners: IBanner[];
}

// What gets passed into the component from the parent as attributes
export declare interface IBannerListInputProps {
    tag: string;
    columns: number;
    classes?: any;
}

export type BannerListProps = IBannerListInputProps & IBannerListProps;