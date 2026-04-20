import { createInjector, inject, mergeProps } from "unstateless";
import {SnippetComponent} from "./Snippet.component";
import {ISnippetInputProps, SnippetProps, ISnippetProps} from "./Snippet.d";
import { overridable } from "@core/lib/overridable";

const injectSnippetProps = createInjector(({}:ISnippetInputProps):ISnippetProps => {
    return {};
});

const connect = inject<ISnippetInputProps, SnippetProps>(mergeProps(
    injectSnippetProps,
));
export const connectSnippet = connect;

export const Snippet = overridable<ISnippetInputProps>(connect(SnippetComponent));
