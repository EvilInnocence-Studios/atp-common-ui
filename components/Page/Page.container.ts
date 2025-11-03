import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { memoizePromise } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { PageComponent } from "./Page.component";
import { IPageInputProps, IPageProps, PageProps } from "./Page.d";

const getPage = memoizePromise(async (slug:string):Promise<IContent | null> => {
    const pages = await services().content.search({type: 'page', slug});
    if( pages.length && pages[0].type === 'page' && pages[0].enabled && pages[0].publishDate && new Date(pages[0].publishDate) <= new Date()) {
        return pages[0];
    }
    return null;
}, {});

const injectPageProps = createInjector(({slug}:IPageInputProps):IPageProps => {
    const [page, setPage] = useState<IContent | null>(null);
    const [notFoundPage, setNotFoundPage] = useState<Partial<IContent>>({
        title: "404: Page Not Found",
        content: "The page you are looking for does not exist.",
    });
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(() => getPage(slug).then(setPage));
    }, [slug]);

    useEffect(() => {
        loader(() => getPage('404').then((page => {
            if( page ) {
                setNotFoundPage(page);
            }
        })));
    }, []);

    return {page, isLoading: loader.isLoading, notFound: !loader.isLoading && !page, notFoundPage};
});

const connect = inject<IPageInputProps, PageProps>(mergeProps(
    injectPageProps,
));

export const Page = overridable<IPageInputProps>(connect(PageComponent));
