export declare interface IClearCacheButtonProps {
    onClick: () => void;
    clearAll: () => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IClearCacheButtonInputProps {
    entity: string;
    cacheType: string;
}

export type ClearCacheButtonProps = IClearCacheButtonInputProps & IClearCacheButtonProps;