import { IBanner } from "@common-shared/banner/types";
import { IMethods } from "@core/lib/types";
import { getResults, handleError } from "@core/lib/util";

export const bannerServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    banner: {
        create: (file:File) => {
            const formData = new FormData();
            formData.append('file', file);
            return post(`banner`, formData)
                .then(getResults<IBanner>)
                .catch(handleError);
        },                        
        search: ():Promise<IBanner[]> => get('banner').then(getResults<IBanner[]>),
        get: (id: number):Promise<IBanner> => get(`banner/${id}`).then(getResults<IBanner>),
        update: (id: number, data: Partial<IBanner>) => patch(`banner/${id}`, data),
        remove: (id: number) => remove(`banner/${id}`),
    }
});
