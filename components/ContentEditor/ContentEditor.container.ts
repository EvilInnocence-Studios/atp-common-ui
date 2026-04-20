import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useUpdater } from "@core/lib/useUpdater";
import { createInjector, inject, mergeProps } from "unstateless";
import { ContentEditorComponent } from "./ContentEditor.component";
import { ContentEditorProps, IContentEditorInputProps, IContentEditorProps } from "./ContentEditor.d";
import { useNavigate } from "react-router";
import { flash } from "@core/lib/flash";

const injectContentEditorProps = createInjector(({contentId, type, onUpdate}:IContentEditorInputProps):IContentEditorProps => {
    const navigate = useNavigate();
    
    const updater = useUpdater<IContent>(
        type,
        contentId,
        {} as IContent,
        services().content.get,
        services().content.update,
        "manual",
        onUpdate
    )
    
    const remove = () => services().content.remove(contentId).then(() => {
        flash.success(`${type} deleted`);
        navigate(`/${type}s`);
    });

    return {content: updater.history.entity, ...updater, remove};
});

const connect = inject<IContentEditorInputProps, ContentEditorProps>(mergeProps(
    injectContentEditorProps,
));
export const connectContentEditor = connect;

export const ContentEditor = overridable<IContentEditorInputProps>(connect(ContentEditorComponent));
