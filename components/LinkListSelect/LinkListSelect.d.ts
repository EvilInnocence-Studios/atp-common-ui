import { ILinkList } from "@common-shared/link/types";

export declare interface ILinkListSelectProps {
    lists: {value: string, label: string}[];
}

// What gets passed into the component from the parent as attributes
export declare interface ILinkListSelectInputProps {
    listId?: string;
    onChange: (listId: string | null) => void;
    className?: string;
}

export type LinkListSelectProps = ILinkListSelectInputProps & ILinkListSelectProps;