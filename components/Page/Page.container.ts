import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { PageComponent } from "./Page.component";
import { IPageInputProps, IPageProps, PageProps } from "./Page.d";

const injectPageProps = createInjector(({slug}:IPageInputProps):IPageProps => {
    const [page, setPage] = useState<IContent | null>(null);
    const [notFoundPage, setNotFoundPage] = useState<Partial<IContent>>({
        title: "404: Page Not Found",
        content: "The page you are looking for does not exist.",
    });
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

    useEffect(() => {
        loader(() => 
            services().content.search({type: 'page', slug: '404'})
            .then(pages => {
                if( pages.length && pages[0].type === 'page') {
                    setNotFoundPage(pages[0]);
                    return;
                }
        }));
    }, []);

    return {page, isLoading: loader.isLoading, notFound: !loader.isLoading && !page, notFoundPage};
});

const connect = inject<IPageInputProps, PageProps>(mergeProps(
    injectPageProps,
));

export const Page = connect(PageComponent);
