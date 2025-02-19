import { ITag, ITagGroup, NewTagGroup } from "@common-shared/tag/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";

export const tagGroupServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    tagGroup: {
        create: (tagGroup: NewTagGroup) => post('group', tagGroup).then(getResults<ITagGroup>),
        search: ():Promise<ITagGroup[]> => get('group').then(getResults<ITagGroup[]>),
        update: (id:string, data: Partial<ITagGroup>) => patch(`group/${id}`, data),
        remove: (id:string) => remove(`group/${id}`),
        sort: (groupId:string, newIndex:number) => post(`group/sort`, {groupId, newIndex}),
        tag: {
            getAll: ():Promise<ITag[]> => get('tag').then(getResults<ITag[]>),
            search: (tagGroupId:string):Promise<ITag[]> => get(`group/${tagGroupId}/tag`).then(getResults<ITag[]>),
            create: (tagGroupId:string, tag:Partial<ITag>) => post(`group/${tagGroupId}/tag`, tag),
            update: (tagGroupId:string, tagId:string, data: Partial<ITag>) => patch(`group/${tagGroupId}/tag/${tagId}`, data),
            remove: (tagGroupId:string, tagId:string) => remove(`group/${tagGroupId}/tag/${tagId}`),
            sort: (tagGroupId:string, tagId:string, newIndex:number) => post(`group/${tagGroupId}/tag/sort`, {tagId, newIndex}),
        }
    }
});
