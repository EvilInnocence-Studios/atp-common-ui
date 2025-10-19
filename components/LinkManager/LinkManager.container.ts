import { createInjector, inject, mergeProps } from "unstateless";
import {LinkManagerComponent} from "./LinkManager.component";
import {ILinkManagerInputProps, LinkManagerProps, ILinkManagerProps} from "./LinkManager.d";
import { useEffect, useState } from "react";
import { ILink } from "@common-shared/link/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { all, pipe, prop, sort } from "ts-functional";
import { appendTo, clear } from "@core/lib/util";

const injectLinkManagerProps = createInjector(({list}:ILinkManagerInputProps):ILinkManagerProps => {
    const [links, setLinks] = useState<ILink[]>([]);
    const loader =  useLoaderAsync();

    const link = services().linkList.link;

    const update = (id:string, field:keyof ILink) => (value:any) => {
        const oldLinks = links;
        setLinks(links.map(l => l.id === id ? {...l, [field]: value} : l));
        loader(() => link.update(list.id, id, {[field]: value})
            .then(flash.success("Link updated"))
            .catch(all(() => setLinks(oldLinks), flash.error("Failed to update link")))
        );
    }

    const remove = (id:string) => () => {
        const oldLinks = links;
        setLinks(links.filter(l => l.id !== id));
        loader(() => link.remove(id, id)
            .then(flash.success("Link removed"))
            .catch(all(() => setLinks(oldLinks), flash.error("Failed to remove link")))
        );
    }

    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const create = () => {
        loader(() => link.create(list.id, {text, url})
            .then(appendTo(links))
            .then(all(
                refresh,
                flash.success(`Link ${text} created`),
                clear(setText),
                clear(setUrl),
            ))
            .catch(flash.error("Failed to create link"))
        );
    }

    const sortLinks = (linkId: string, newIndex: number) => {
        loader(() => link.sort(list.id, linkId, newIndex)
            .then(refresh)
            .catch(flash.error("Failed to sort links"))
        );
    }

    const refresh = () => {
        loader(() => link.search(list.id)
            .then(pipe(sort(sort.by<ILink>(prop("order")).asc), setLinks))
            .catch(flash.error("Failed to load links"))
        );
    };
    useEffect(refresh, [list.id]);

    return {
        links, isLoading: loader.isLoading,
        text, setText, url, setUrl,
        create, update, remove, sort: sortLinks,
    };
});

const connect = inject<ILinkManagerInputProps, LinkManagerProps>(mergeProps(
    injectLinkManagerProps,
));

export const LinkManager = connect(LinkManagerComponent);
