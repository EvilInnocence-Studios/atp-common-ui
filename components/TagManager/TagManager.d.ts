import { ITag, ITagGroup } from "@common-shared/tag/types";

export declare interface ITagManagerProps {
    tags: ITag[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    create: () => void;
    update: (id:string, field:keyof ITag) => (value:any) => void;
    remove: (id:string) => () => void;
    sort: (e:{active:{id:any}, over:{id:any} | null}) => void;
    moveToTop: (id:string) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagManagerInputProps {
    group: ITagGroup;
}

export type TagManagerProps = ITagManagerInputProps & ITagManagerProps;