import { ITag, ITagGroup } from "@common-shared/tag/types";

export declare interface IEntityTagEditorProps {
    allTags: Array<{
        group: ITagGroup;
        tags: ITag[];
    }>;
    entityTags: ITag[];
    onAddTag: (tagId:string) => void;
    onRemoveTag: (tagId:string) => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IEntityTagEditorInputProps {
    search: () => Promise<ITag[]>;
    create: (tagId:string) => Promise<void>;
    remove: (tagId:string) => Promise<void>;
}

export type EntityTagEditorProps = IEntityTagEditorInputProps & IEntityTagEditorProps;