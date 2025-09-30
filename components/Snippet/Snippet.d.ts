import { IContent } from "@common-shared/content/types";

export declare interface ISnippetProps {
    snippet: IContent | null;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ISnippetInputProps {
    slug: string;
    className?: string;
}

export type SnippetProps = ISnippetInputProps & ISnippetProps;