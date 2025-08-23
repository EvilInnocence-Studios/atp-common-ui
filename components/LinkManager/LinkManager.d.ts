import { ILink, ILinkList } from "@common-shared/link/types";

export declare interface ILinkManagerProps {
    links: ILink[];
    isLoading: boolean;
    text: string;
    setText: Setter<string>;
    url: string;
    setUrl: Setter<string>;
    create: () => void;
    update: (id:string, field:keyof ILink) => (value:any) => void;
    remove: (id:string) => () => void;
    sort: (e:{active:{id:any}, over:{id:any} | null}) => void;
    moveToTop: (id:string) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ILinkManagerInputProps {
    list: ILinkList;
}

export type LinkManagerProps = ILinkManagerInputProps & ILinkManagerProps;