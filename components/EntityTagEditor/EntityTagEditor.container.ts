import { createInjector, inject, mergeProps } from "unstateless";
import {EntityTagEditorComponent} from "./EntityTagEditor.component";
import {IEntityTagEditorInputProps, EntityTagEditorProps, IEntityTagEditorProps} from "./EntityTagEditor.d";
import { useEffect, useState } from "react";
import { ITag, ITagGroup } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { flash } from "@core/lib/flash";

const injectEntityTagEditorProps = createInjector(({search, create, remove}:IEntityTagEditorInputProps):IEntityTagEditorProps => {
    const [allTags, setAllTags] = useState<Array<{group: ITagGroup; tags: ITag[]}>>([]);
    const [entityTags, setEntityTags] = useState<ITag[]>([]);
    const loader = useLoader();

    useEffect(() => {
        loader.start();
        search()
            .then(setEntityTags)
            .catch(flash.error('Failed to load entity tags'))
            .finally(loader.stop);
    }, [search]);

    useEffect(() => {
        loader.start();
        services().tagGroup.search()
            .then(groups => {
                const promises = groups.map(group => services().tagGroup.tag.search(group.id).then(tags => ({group, tags})));
                Promise.all(promises).then(setAllTags);
            })
            .catch(flash.error('Failed to load tags'))
            .finally(loader.stop);
    }, []);

    const onAddTag = (tagId:string) => {
        loader.start();
        create(tagId)
            .then(() => setEntityTags([...entityTags, allTags.flatMap(t => t.tags).find(t => t.id === tagId)!]))
            .catch(flash.error('Failed to add tag'))
            .finally(loader.stop);
    }

    const onRemoveTag = (tagId:string) => {
        loader.start();
        remove(tagId)
            .then(() => setEntityTags(entityTags.filter(t => t.id !== tagId)))
            .catch(flash.error('Failed to remove tag'))
            .finally(loader.stop);
    }

    return {allTags, entityTags, onAddTag, onRemoveTag, isLoading: loader.isLoading};
});

const connect = inject<IEntityTagEditorInputProps, EntityTagEditorProps>(mergeProps(
    injectEntityTagEditorProps,
));

export const EntityTagEditor = connect(EntityTagEditorComponent);
