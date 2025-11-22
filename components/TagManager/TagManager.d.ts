import { ITag, ITagGroup } from "@common-shared/tag/types";

export declare interface ITagManagerProps {
    tags: ITag[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    create: () => void;
    update: (id: string, field: keyof ITag) => (value: any) => void;
    remove: (id: string) => () => void;
    sort: (id: string, newIndex: number) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagManagerInputProps {
    group: ITagGroup;
    classes?: any;
}

export type TagManagerProps = ITagManagerInputProps & ITagManagerProps;