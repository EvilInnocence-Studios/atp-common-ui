import { ILink, ILinkList } from "@common-shared/link/types";

export declare interface ILinkManagerProps {
    links: ILink[];
    isLoading: boolean;
    text: string;
    setText: Setter<string>;
    url: string;
    setUrl: Setter<string>;
    create: () => void;
    update: (id: string, field: keyof ILink) => (value: any) => void;
    remove: (id: string) => () => void;
    sort: (id: string, newIndex: number) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ILinkManagerInputProps {
    list: ILinkList;
    classes?: any;
}

export type LinkManagerProps = ILinkManagerInputProps & ILinkManagerProps;