import { ILinkList } from "@common-shared/link/types";

export declare interface ILinkListManagerProps {
    lists: ILinkList[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    listKey: string;
    setListKey: Setter<string>;
    selectedList: string | null;
    setSelectedList: Setter<string>;
    create: () => void;
    update: (id:string, field:string) => (value:any) => void;
    remove: (id:string) => () => void;

}

// What gets passed into the component from the parent as attributes
export declare interface ILinkListManagerInputProps {

}

export type LinkListManagerProps = ILinkListManagerInputProps & ILinkListManagerProps;