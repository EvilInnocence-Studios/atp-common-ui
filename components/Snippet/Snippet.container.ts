import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { SnippetComponent } from "./Snippet.component";
import { ISnippetInputProps, ISnippetProps, SnippetProps } from "./Snippet.d";

const injectSnippetProps = createInjector(({slug}:ISnippetInputProps):ISnippetProps => {
    const [snippet, setSnippet] = useState<IContent | null>(null);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(() =>
            services().content.search({type: 'snippet', slug})
            .then(pages => {
                setSnippet(pages.length && pages[0].type === 'snippet' && pages[0].enabled && pages[0].publishDate && new Date(pages[0].publishDate) <= new Date()
                    ? pages[0]
                    : null
                );
        }));
    }, [slug]);

    return {snippet, isLoading: loader.isLoading};
});

const connect = inject<ISnippetInputProps, SnippetProps>(mergeProps(
    injectSnippetProps,
));

export const Snippet = overridable<ISnippetInputProps>(connect(SnippetComponent));
