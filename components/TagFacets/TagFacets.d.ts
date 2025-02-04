import { ITag, ITagGroup } from "@common-shared/tag/types";
import { IGroupToggle, IToggle } from "@core/lib/useToggle";

export declare interface ITagFacetsProps {
    groups: Array<{group: ITagGroup, tags: ITag[]}>;
    isLoading: boolean;
    toggles: IGroupToggle;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagFacetsInputProps {
    selectTag: (tagId: string) => void;
    removeTag: (tagId: string) => void;
    selectedTagIds: string[];
}

export type TagFacetsProps = ITagFacetsInputProps & ITagFacetsProps;