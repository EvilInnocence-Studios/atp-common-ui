import { ITag, ITagGroup } from "@common-shared/tag/types";

export declare interface ITagFacetsProps {
    groups: Array<{group: ITagGroup, tags: ITag[]}>;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagFacetsInputProps {
    selectTag: (tagId: string) => void;
    removeTag: (tagId: string) => void;
    selectedTagIds: string[];
}

export type TagFacetsProps = ITagFacetsInputProps & ITagFacetsProps;