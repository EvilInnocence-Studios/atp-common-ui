import { IContent } from "@common-shared/content/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { ContentManagerComponent } from "./ContentManager.component";
import { ContentManagerProps, IContentManagerInputProps, IContentManagerProps } from "./ContentManager.d";

const injectContentManagerProps = createInjector(({type}:IContentManagerInputProps):IContentManagerProps => {
    const [pages, setPages] = useState<IContent[]>([]);
    const loader = useLoaderAsync();
    const navigate = useNavigate();

    const refresh = () => {
        loader(() => services().content.search({ type })
            .then(setPages)
        );
    }

    const goToContent = (content:IContent) => {
        refresh();
        navigate(`/${content.type}s/${content.id}`, {});
    }

    useEffect(refresh, []);

    const create = () => {
        loader(() => services().content.create({
            type,
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            slug: `new-${type}-${Date.now()}`,
            content: `This is a new ${type}.`,
            enabled: false,
        }).then(goToContent));
    }
    
    return {pages, isLoading: loader.isLoading, create, refresh};
});

const connect = inject<IContentManagerInputProps, ContentManagerProps>(mergeProps(
    injectContentManagerProps,
));
export const connectContentManager = connect;

export const ContentManager = overridable<IContentManagerInputProps>(connect(ContentManagerComponent));
