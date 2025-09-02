import { IMedia } from "@common-shared/media/types";
import { IMethods } from "@core/lib/types";
import { getResults, handleError } from "@core/lib/util";

export const mediaServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    media: {
        create: (file:File, overwrite: boolean):Promise<IMedia> => {
            const formData = new FormData();
            formData.append('file', file);
            return post(overwrite ? `media/replace` : `media`, formData)
                .then(getResults<IMedia>)
                .catch(handleError);
        },                        
        search: (query:{}):Promise<IMedia[]> => get('media', query).then(getResults<IMedia[]>),
        get: (id:string):Promise<IMedia> => get(`media/${id}`).then(getResults<IMedia>),
        update: (id:string, data: Partial<IMedia>) => patch(`media/${id}`, data),
        replace: (id:string, file:File) => {
            const formData = new FormData();
            formData.append('file', file);
            return post(`media/${id}/replace`, formData)
                .then(getResults<IMedia>)
                .catch(handleError);
        },
        remove: (id:string) => remove(`media/${id}`),
    }
});
