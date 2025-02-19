import { ITagGroup } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { appendTo, clear } from "@core/lib/util";
import { useEffect, useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { TagGroupManagerComponent } from "./TagGroupManager.component";
import { ITagGroupManagerInputProps, ITagGroupManagerProps, TagGroupManagerProps } from "./TagGroupManager.d";

const injectTagGroupManagerProps = createInjector(({}:ITagGroupManagerInputProps):ITagGroupManagerProps => {
    const [groups, setGroups] = useState<ITagGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const loader =  useLoaderAsync();

    const group = services().tagGroup;

    const update = (id:string, field:string) => (value:any) => {
        const oldGroups = groups;
        setGroups(groups.map(g => g.id === id ? {...g, [field]: value} : g));
        loader(() => group.update(id, {[field]: value})
            .then(flash.success("Tag group updated"))
            .catch(all(() => setGroups(oldGroups), flash.error("Failed to update tag group")))
        );
    }

    const remove = (id:string) => () => {
        const oldGroups = groups;
        setGroups(groups.filter(g => g.id !== id));
        loader(() => group.remove(id)
            .then(flash.success("Tag group removed"))
            .catch(all(() => setGroups(oldGroups), flash.error("Failed to remove tag group")))
        );
    }

    const [name, setName] = useState('');
    const create = () => {
        loader(() => group.create({name, filterable: true, order: 0})
            .then(appendTo(groups))
            .then(all(
                refresh,
                flash.success(`Tag group ${name} created`),
                clear(setName),
            ))
            .catch(flash.error("Failed to create tag group"))
        );
    }

    const refresh = () => {
        loader(() => group.search()
            .then(setGroups)
            .catch(flash.error("Failed to load tag groups"))
        );
    };
    useEffect(refresh, []);

    const sortGroups = (e:{active:{id:any}, over:{id:any} | null}) => {
        const {active, over} = e;
        const [groupId, _oldIndex] = active.id.split(':');
        const newIndex = over ? over.id.split(':')[1] : groups.length - 1;
        loader(() => services().tagGroup.sort(groupId, newIndex)
            .then(refresh)
            .catch(flash.error("Failed to sort tags"))
        );
    }

    return {groups, isLoading: loader.isLoading, name, setName, create, update, remove, selectedGroup, setSelectedGroup, sortGroups};
});

const connect = inject<ITagGroupManagerInputProps, TagGroupManagerProps>(mergeProps(
    injectTagGroupManagerProps,
));

export const TagGroupManager = connect(TagGroupManagerComponent);
