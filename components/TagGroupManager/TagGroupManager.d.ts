import { ITagGroup } from "@common-shared/tag/types";

export declare interface ITagGroupManagerProps {
    groups: ITagGroup[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    create: () => void;
    update: (id:string, field:string) => (value:any) => void;
    remove: (id:string) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagGroupManagerInputProps {

}

export type TagGroupManagerProps = ITagGroupManagerInputProps & ITagGroupManagerProps;