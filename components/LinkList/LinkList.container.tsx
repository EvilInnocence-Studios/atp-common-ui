import { ILink, ILinkList } from "@common-shared/link/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { LinkListComponent } from "./LinkList.component";
import { ILinkListInputProps, ILinkListProps, LinkListProps } from "./LinkList.d";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { Label } from "@core/components/Label";
import { Editable } from "@core/components/Editable";

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

export const LinkList = withLayoutMetadata(
    overridable<ILinkListInputProps>(connect(LinkListComponent)),
    {
        name: 'LinkList',
        category: 'Common',
        icon,
        displayName: 'Link List',
        description: 'A list of links',
        propEditor: (props: any, updateProps: (props: any) => void) => <>
            <Label label="Key">
                <Editable value={props.id} onChange={value => updateProps({ ...props, id: value })} />
            </Label>
        </>
    }
);
