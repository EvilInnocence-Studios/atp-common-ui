import { createInjector, inject, mergeProps } from "unstateless";
import {SnippetManagerComponent} from "./SnippetManager.component";
import {ISnippetManagerInputProps, SnippetManagerProps, ISnippetManagerProps} from "./SnippetManager.d";

const injectSnippetManagerProps = createInjector(({}:ISnippetManagerInputProps):ISnippetManagerProps => {
    return {};
});

const connect = inject<ISnippetManagerInputProps, SnippetManagerProps>(mergeProps(
    injectSnippetManagerProps,
));

export const SnippetManager = connect(SnippetManagerComponent);
