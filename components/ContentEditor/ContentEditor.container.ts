import { createInjector, inject, mergeProps } from "unstateless";
import {ContentEditorComponent} from "./ContentEditor.component";
import {IContentEditorInputProps, ContentEditorProps, IContentEditorProps} from "./ContentEditor.d";
import { useUpdater } from "@core/lib/useUpdater";
import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";

const injectContentEditorProps = createInjector(({content, onUpdate}:IContentEditorInputProps):IContentEditorProps => {
    const updater = useUpdater<IContent>(
        content.type,
        content.id,
        {} as IContent,
        services().content.get,
        services().content.update,
        "manual",
        onUpdate
    )
    
    return {content: updater.history.entity, ...updater};
});

const connect = inject<IContentEditorInputProps, ContentEditorProps>(mergeProps(
    injectContentEditorProps,
));

export const ContentEditor = connect(ContentEditorComponent);
