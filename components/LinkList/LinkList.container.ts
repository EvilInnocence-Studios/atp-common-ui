import { ILink, ILinkList } from "@common-shared/link/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { LinkListComponent } from "./LinkList.component";
import { ILinkListInputProps, ILinkListProps, LinkListProps } from "./LinkList.d";

const injectLinkListProps = createInjector(({id}:ILinkListInputProps):ILinkListProps => {
    const [links, setLinks] = useState<ILink[]>([]);
    const loader =  useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            const lists = await services().linkList.search();
            const list = lists.find(l => l.key === id) as ILinkList;
            await services().linkList.link.search(list.id).then(setLinks);
    });}, [id]);
    
    return {links, isLoading: loader.isLoading};
});

const connect = inject<ILinkListInputProps, LinkListProps>(mergeProps(
    injectLinkListProps,
));
export const connectLinkList = connect;

export const LinkList = overridable<ILinkListInputProps>(connect(LinkListComponent));
