import { IContent, NewContent } from "@common-shared/content/types";
import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";

export const contentServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    content: {
        get: (contentId:string):Promise<IContent> => get(`content/${contentId}`).then(getResults),
        search: (query?:Query):Promise<IContent[]> => get('content', query).then(getResults),
        create: (data: NewContent):Promise<IContent> => post('content', data).then(getResults),
        update: (contentId:string, data: Partial<IContent>):Promise<IContent> => patch(`content/${contentId}`, data).then(getResults),
        remove: (contentId:string):Promise<any> => remove(`content/${contentId}`),
    }
});
