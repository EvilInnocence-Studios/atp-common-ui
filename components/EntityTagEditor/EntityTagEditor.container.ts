import { ITag, ITagGroup } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoader } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps, useLocalStorage } from "unstateless";
import { EntityTagEditorComponent } from "./EntityTagEditor.component";
import { EntityTagEditorProps, IEntityTagEditorInputProps, IEntityTagEditorProps } from "./EntityTagEditor.d";

const useShowHiddenTags = useLocalStorage.boolean("showHiddenTagsInEntityEditor", false);

const injectEntityTagEditorProps = createInjector(({search, create, remove}:IEntityTagEditorInputProps):IEntityTagEditorProps => {
    const [allTags, setAllTags] = useState<Array<{group: ITagGroup; tags: ITag[]}>>([]);
    const [entityTags, setEntityTags] = useState<ITag[]>([]);
    const [showHiddenTags, setShowHiddenTags] = useShowHiddenTags();
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

    return {allTags, entityTags, onAddTag, onRemoveTag, isLoading: loader.isLoading, showHiddenTags, setShowHiddenTags};
});

const connect = inject<IEntityTagEditorInputProps, EntityTagEditorProps>(mergeProps(
    injectEntityTagEditorProps,
));
export const connectEntityTagEditor = connect;

export const EntityTagEditor = overridable<IEntityTagEditorInputProps>(connect(EntityTagEditorComponent));
