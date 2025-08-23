import { ILink } from "@common-shared/link/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { LinkListComponent } from "./LinkList.component";
import { ILinkListInputProps, ILinkListProps, LinkListProps } from "./LinkList.d";

const injectLinkListProps = createInjector(({id}:ILinkListInputProps):ILinkListProps => {
    const [links, setLinks] = useState<ILink[]>([]);
    const loader =  useLoaderAsync();

    useEffect(() => {
        loader(() => services().linkList.link.search(id).then(setLinks));
    }, [id]);
    
    return {links, isLoading: loader.isLoading};
});

const connect = inject<ILinkListInputProps, LinkListProps>(mergeProps(
    injectLinkListProps,
));

export const LinkList = connect(LinkListComponent);
