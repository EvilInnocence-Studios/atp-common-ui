import { ILink } from "@common-shared/link/types";

export declare interface ILinkListProps {
    links: ILink[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ILinkListInputProps {
    id: string;
    className?: string;
    classes?: any;
    css?: string;
}

export type LinkListProps = ILinkListInputProps & ILinkListProps;