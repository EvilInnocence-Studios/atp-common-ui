import { createInjector, inject, mergeProps } from "unstateless";
import {TagManagerComponent} from "./TagManager.component";
import {ITagManagerInputProps, TagManagerProps, ITagManagerProps} from "./TagManager.d";
import { useEffect, useState } from "react";
import { ITag } from "@common-shared/tag/types";
import { useLoader } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { all } from "ts-functional";
import { appendTo, clear } from "@core/lib/util";

const injectTagManagerProps = createInjector(({group}:ITagManagerInputProps):ITagManagerProps => {
    const [tags, setTags] = useState<ITag[]>([]);
    const loader =  useLoader();

    const tag = services().tagGroup.tag;

    const update = (id:string) => (name:string) => {
        const oldTags = tags;
        setTags(tags.map(t => t.id === id ? {...t, name} : t));
        loader.start();
        tag.update(group.id, id, {name})
            .then(flash.success("Tag updated"))
            .catch(all(() => setTags(oldTags), flash.error("Failed to update tag")))
            .finally(loader.stop);
    }

    const remove = (id:string) => () => {
        const oldTags = tags;
        setTags(tags.filter(t => t.id !== id));
        loader.start();
        tag.remove(group.id, id)
            .then(flash.success("Tag removed"))
            .catch(all(() => setTags(oldTags), flash.error("Failed to remove tag")))
            .finally(loader.stop);
    }

    const [name, setName] = useState('');
    const create = () => {
        loader.start();
        tag.create(group.id, {name, groupId: group.id})
            .then(appendTo(tags))
            .then(all(
                refresh,
                flash.success(`Tag ${name} created`),
                clear(setName),
            ))
            .catch(flash.error("Failed to create tag"))
            .finally(loader.stop);
    }

    const refresh = () => {
        loader.start();
        tag.search(group.id)
            .then(setTags)
            .catch(flash.error("Failed to load tags"))
            .finally(loader.stop);
    };
    useEffect(refresh, [group.id]);

    return {tags, isLoading: loader.isLoading, name, setName, create, update, remove};
});

const connect = inject<ITagManagerInputProps, TagManagerProps>(mergeProps(
    injectTagManagerProps,
));

export const TagManager = connect(TagManagerComponent);
