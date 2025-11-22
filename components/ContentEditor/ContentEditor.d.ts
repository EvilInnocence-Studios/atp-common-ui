import { IContent } from "@common-shared/content/types";
import { IUpdater } from "@core/lib/useUpdater";

export declare interface IContentEditorProps extends IUpdater<IContent> {
    content: IContent;
}

// What gets passed into the component from the parent as attributes
export declare interface IContentEditorInputProps {
    content: IContent;
    type: "page" | "snippet";
    onUpdate?: (content: IContent) => () => void;
    classes?: any;
}

export type ContentEditorProps = IContentEditorInputProps & IContentEditorProps;