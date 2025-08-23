import { ILink, ILinkList, NewLinkList } from "@common-shared/link/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";

export const linkServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    linkList: {
        create: (linkList: NewLinkList) => post('linkList', linkList).then(getResults<ILinkList>),
        search: (query?:{}):Promise<ILinkList[]> => get('linkList', query).then(getResults<ILinkList[]>),
        update: (id:string, data: Partial<ILinkList>) => patch(`linkList/${id}`, data),
        remove: (id:string) => remove(`linkList/${id}`),
        link: {
            get: (listId:string, linkId:string):Promise<ILink> => get(`linkList/${listId}/link/${linkId}`).then(getResults<ILink>),
            search: (listId:string):Promise<ILink[]> => get(`linkList/${listId}/link`).then(getResults<ILink[]>),
            create: (listId:string, link:Partial<ILink>) => post(`linkList/${listId}/link`, {...link, listId}),
            update: (listId:string, linkId:string, data: Partial<ILink>) => patch(`linkList/${listId}/link/${linkId}`, data),
            remove: (listId:string, linkId:string) => remove(`linkList/${listId}/link/${linkId}`),
            sort: (listId:string, linkId:string, newIndex:number) => post(`linkList/${listId}/link/sort`, {linkId, newIndex}),
        }
    }
});
