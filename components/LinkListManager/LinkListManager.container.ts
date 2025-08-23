import { ILinkList } from "@common-shared/link/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { appendTo, clear } from "@core/lib/util";
import { useEffect, useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { LinkListManagerComponent } from "./LinkListManager.component";
import { ILinkListManagerInputProps, ILinkListManagerProps, LinkListManagerProps } from "./LinkListManager.d";

const injectLinkListManagerProps = createInjector(({}:ILinkListManagerInputProps):ILinkListManagerProps => {
    const [lists, setLists] = useState<ILinkList[]>([]);
    const [selectedList, setSelectedList] = useState<string | null>(null);
    const loader =  useLoaderAsync();

    const list = services().linkList;

    const update = (id:string, field:string) => (value:any) => {
        const oldLists = lists;
        setLists(lists.map(l => l.id === id ? {...l, [field]: value} : l));
        loader(() => list.update(id, {[field]: value})
            .then(flash.success("Link list updated"))
            .catch(all(() => setLists(oldLists), flash.error("Failed to update link list")))
        );
    }

    const remove = (id:string) => () => {
        const oldLists = lists;
        setLists(lists.filter(l => l.id !== id));
        loader(() => list.remove(id)
            .then(flash.success("List removed"))
            .catch(all(() => setLists(oldLists), flash.error("Failed to remove link list")))
        );
    }

    const [name, setName] = useState('');
    const [listKey, setListKey] = useState('');
    const create = () => {
        loader(() => list.create({name, key: listKey})
            .then(appendTo(lists))
            .then(all(
                refresh,
                flash.success(`Link list ${name} created`),
                clear(setName),
            ))
            .catch(flash.error("Failed to create link list"))
        );
    }

    const refresh = () => {
        loader(() => list.search()
            .then(setLists)
            .catch(flash.error("Failed to load link lists"))
        );
    };
    useEffect(refresh, []);

    return {
        lists, isLoading: loader.isLoading,
        name, setName,
        listKey, setListKey,
        create, update, remove, selectedList, setSelectedList,
    };
});

const connect = inject<ILinkListManagerInputProps, LinkListManagerProps>(mergeProps(
    injectLinkListManagerProps,
));

export const LinkListManager = connect(LinkListManagerComponent);
