import { ITag, ITagGroup } from "@common-shared/tag/types";

export declare interface IEntityTagEditorProps {
    allTags: Array<{
        group: ITagGroup;
        tags: ITag[];
    }>;
    entityTags: ITag[];
    onAddTag: (tagId:number) => void;
    onRemoveTag: (tagId:number) => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IEntityTagEditorInputProps {
    search: () => Promise<ITag[]>;
    create: (tagId:number) => Promise<void>;
    remove: (tagId:number) => Promise<void>;
}

export type EntityTagEditorProps = IEntityTagEditorInputProps & IEntityTagEditorProps;