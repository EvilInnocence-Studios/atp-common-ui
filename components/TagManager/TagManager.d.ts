import { ITag, ITagGroup } from "@common-shared/tag/types";

export declare interface ITagManagerProps {
    tags: ITag[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    create: () => void;
    update: (id: number) => (name:string) => void;
    remove: (id: number) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagManagerInputProps {
    group: ITagGroup;
}

export type TagManagerProps = ITagManagerInputProps & ITagManagerProps;