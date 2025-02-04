import { ITag, ITagGroup } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { memoizePromise } from "ts-functional";

const loadGroups = memoizePromise(() => services().tagGroup.search());
const loadTags = memoizePromise(() => services().tagGroup.tag.getAll());

export const useTagGroups = () => {
    const [groups, setGroups] = useState<Array<{group: ITagGroup, tags: ITag[]}>>([]);
    const loader = useLoaderAsync();
    
    useEffect(() => {
        loader(async () => {
            Promise.all([
                loadGroups(),
                loadTags(),
            ]).then(([groups, tags]) => {
                setGroups(groups.map(group => ({
                    group,
                    tags: tags.filter(tag => tag.groupId === group.id),
                })));
            });
        });
    }, []);

    return {groups, isLoading: loader.isLoading};
}