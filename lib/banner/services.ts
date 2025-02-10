import { IBanner } from "@common-shared/banner/types";
import { IMethods } from "@core/lib/types";
import { getResults, handleError } from "@core/lib/util";

export const bannerServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    banner: {
        create: (file:File, overwrite: boolean) => {
            const formData = new FormData();
            formData.append('file', file);
            return post(overwrite ? `banner/replace` : `banner`, formData)
                .then(getResults<IBanner>)
                .catch(handleError);
        },                        
        search: (query:{}):Promise<IBanner[]> => get('banner', query).then(getResults<IBanner[]>),
        get: (id:string):Promise<IBanner> => get(`banner/${id}`).then(getResults<IBanner>),
        update: (id:string, data: Partial<IBanner>) => patch(`banner/${id}`, data),
        remove: (id:string) => remove(`banner/${id}`),
    }
});
