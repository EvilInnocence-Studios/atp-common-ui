import { createInjector, inject, mergeProps } from "unstateless";
import {PageComponent} from "./Page.component";
import {IPageInputProps, PageProps, IPageProps} from "./Page.d";
import { useEffect, useState } from "react";
import { IContent } from "@common-shared/content/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";

const injectPageProps = createInjector(({slug}:IPageInputProps):IPageProps => {
    const [page, setPage] = useState<IContent | null>(null);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(() =>
            services().content.search({type: 'page', slug})
            .then(pages => {

                setPage(pages.length && pages[0].type === 'page' && pages[0].enabled && pages[0].publishDate && new Date(pages[0].publishDate) <= new Date()
                    ? pages[0]
                    : null
                );
        }));
    }, [slug]);

    return {page, isLoading: loader.isLoading, notFound: !loader.isLoading && !page};
});

const connect = inject<IPageInputProps, PageProps>(mergeProps(
    injectPageProps,
));

export const Page = connect(PageComponent);
