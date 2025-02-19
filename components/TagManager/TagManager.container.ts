import { ITag } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { appendTo, clear } from "@core/lib/util";
import { useEffect, useState } from "react";
import { all, pipe, prop, sort } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { TagManagerComponent } from "./TagManager.component";
import { ITagManagerInputProps, ITagManagerProps, TagManagerProps } from "./TagManager.d";

const injectTagManagerProps = createInjector(({group}:ITagManagerInputProps):ITagManagerProps => {
    const [tags, setTags] = useState<ITag[]>([]);
    const loader =  useLoaderAsync();

    const tag = services().tagGroup.tag;

    const update = (id:string, field:keyof ITag) => (value:any) => {
        const oldTags = tags;
        setTags(tags.map(t => t.id === id ? {...t, [field]: value} : t));
        loader(() => tag.update(group.id, id, {[field]: value})
            .then(flash.success("Tag updated"))
            .catch(all(() => setTags(oldTags), flash.error("Failed to update tag")))
        );
    }

    const remove = (id:string) => () => {
        const oldTags = tags;
        setTags(tags.filter(t => t.id !== id));
        loader(() => tag.remove(group.id, id)
            .then(flash.success("Tag removed"))
            .catch(all(() => setTags(oldTags), flash.error("Failed to remove tag")))
        );
    }

    const [name, setName] = useState('');
    const create = () => {
        loader(() => tag.create(group.id, {name, groupId: group.id})
            .then(appendTo(tags))
            .then(all(
                refresh,
                flash.success(`Tag ${name} created`),
                clear(setName),
            ))
            .catch(flash.error("Failed to create tag"))
        );
    }

    const sortTags = (e:{active:{id:any}, over:{id:any} | null}) => {
        const {active, over} = e;
        const [tagId, _oldIndex] = active.id.split(':');
        const newIndex = over ? over.id.split(':')[1] : tags.length - 1;
        loader(() => services().tagGroup.tag.sort(group.id, tagId, newIndex)
            .then(refresh)
            .catch(flash.error("Failed to sort tags"))
        );
    }

    const refresh = () => {
        loader(() => tag.search(group.id)
            .then(pipe(sort(sort.by<ITag>(prop("order")).asc), setTags))
            .catch(flash.error("Failed to load tags"))
        );
    };
    useEffect(refresh, [group.id]);

    return {tags, isLoading: loader.isLoading, name, setName, create, update, remove, sort: sortTags};
});

const connect = inject<ITagManagerInputProps, TagManagerProps>(mergeProps(
    injectTagManagerProps,
));

export const TagManager = connect(TagManagerComponent);
