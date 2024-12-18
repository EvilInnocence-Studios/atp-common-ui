import { createInjector, inject, mergeProps } from "unstateless";
import {TagGroupManagerComponent} from "./TagGroupManager.component";
import {ITagGroupManagerInputProps, TagGroupManagerProps, ITagGroupManagerProps} from "./TagGroupManager.d";
import { useEffect, useState } from "react";
import { ITagGroup } from "@common-shared/tag/types";
import { useLoader } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { all } from "ts-functional";
import { appendTo, clear } from "@core/lib/util";

const injectTagGroupManagerProps = createInjector(({}:ITagGroupManagerInputProps):ITagGroupManagerProps => {
    const [groups, setGroups] = useState<ITagGroup[]>([]);
    const loader =  useLoader();

    const group = services().tagGroup;

    const update = (id:number) => (name:string) => {
        const oldGroups = groups;
        setGroups(groups.map(g => g.id === id ? {...g, name} : g));
        loader.start();
        group.update(id, {name})
            .then(flash.success("Tag group updated"))
            .catch(all(() => setGroups(oldGroups), flash.error("Failed to update tag group")))
            .finally(loader.stop);
    }

    const remove = (id:number) => () => {
        const oldGroups = groups;
        setGroups(groups.filter(g => g.id !== id));
        loader.start();
        group.remove(id)
            .then(flash.success("Tag group removed"))
            .catch(all(() => setGroups(oldGroups), flash.error("Failed to remove tag group")))
            .finally(loader.stop);
    }

    const [name, setName] = useState('');
    const create = () => {
        loader.start();
        group.create({name})
            .then(appendTo(groups))
            .then(all(
                refresh,
                flash.success(`Tag group ${name} created`),
                clear(setName),
            ))
            .catch(flash.error("Failed to create tag group"))
            .finally(loader.stop);
    }

    const refresh = () => {
        loader.start();
        group.search()
            .then(setGroups)
            .catch(flash.error("Failed to load tag groups"))
            .finally(loader.stop);
    };
    useEffect(refresh, []);

    return {groups, isLoading: loader.isLoading, name, setName, create, update, remove};
});

const connect = inject<ITagGroupManagerInputProps, TagGroupManagerProps>(mergeProps(
    injectTagGroupManagerProps,
));

export const TagGroupManager = connect(TagGroupManagerComponent);
