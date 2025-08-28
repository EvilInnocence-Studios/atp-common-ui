import { createInjector, inject, mergeProps } from "unstateless";
import {ContentManagerComponent} from "./ContentManager.component";
import {IContentManagerInputProps, ContentManagerProps, IContentManagerProps} from "./ContentManager.d";
import { useEffect, useState } from "react";
import { IContent } from "@common-shared/content/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";

const injectContentManagerProps = createInjector(({type}:IContentManagerInputProps):IContentManagerProps => {
    const [pages, setPages] = useState<IContent[]>([]);
    const loader = useLoaderAsync();

    const refresh = () => {
        loader(() => services().content.search({ type })
            .then(setPages)
        );
    }

    useEffect(refresh, []);

    const create = () => {
        loader(() => services().content.create({
            type,
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            slug: `new-${type}-${Date.now()}`,
            content: `This is a new ${type}.`,
            enabled: false,
        }).then(refresh))
    }
    
    return {pages, isLoading: loader.isLoading, create, refresh};
});

const connect = inject<IContentManagerInputProps, ContentManagerProps>(mergeProps(
    injectContentManagerProps,
));

export const ContentManager = connect(ContentManagerComponent);
