import { ITag, ITagGroup, NewTagGroup } from "@common-shared/tag/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";

export const tagGroupServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    tagGroup: {
        create: (tagGroup: NewTagGroup) => post('group', tagGroup).then(getResults<ITagGroup>),
        search: ():Promise<ITagGroup[]> => get('group').then(getResults<ITagGroup[]>),
        update: (id: number, data: Partial<ITagGroup>) => patch(`group/${id}`, data),
        remove: (id: number) => remove(`group/${id}`),
        tag: {
            getAll: ():Promise<ITag[]> => get('tag').then(getResults<ITag[]>),
            search: (tagGroupId: number):Promise<ITag[]> => get(`group/${tagGroupId}/tag`).then(getResults<ITag[]>),
            create: (tagGroupId: number, tag:Partial<ITag>) => post(`group/${tagGroupId}/tag`, tag),
            update: (tagGroupId: number, tagId: number, data: Partial<ITag>) => patch(`group/${tagGroupId}/tag/${tagId}`, data),
            remove: (tagGroupId: number, tagId: number) => remove(`group/${tagGroupId}/tag/${tagId}`),
        }
    }
});
