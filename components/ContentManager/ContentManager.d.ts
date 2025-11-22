import { IContent } from "@common-shared/content/types";

export declare interface IContentManagerProps {
    pages: IContent[];
    isLoading: boolean;
    create: () => void;
    refresh: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IContentManagerInputProps {
    type: "page" | "snippet";
    id?: string;
    classes?: any;
}

export type ContentManagerProps = IContentManagerInputProps & IContentManagerProps;