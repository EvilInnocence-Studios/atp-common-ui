export declare interface ISelectedTagsProps {
    groups: Array<{group: ITagGroup, tags: ITag[]}>;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ISelectedTagsInputProps {
    removeTag: (tagId: string) => void;
    selectedTagIds: string[];
    clearSearch: () => void;
    q?: string;
    clearAll: () => void;
}

export type SelectedTagsProps = ISelectedTagsInputProps & ISelectedTagsProps;