import { ISynonym, NewSynonym } from "@common-shared/synonym/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";

export const synonymServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    synonym: {
        create: (synonym: NewSynonym):Promise<ISynonym> => post('synonym', synonym).then(getResults<ISynonym>),
        search: ():Promise<ISynonym[]> => get('synonym').then(getResults<ISynonym[]>),
        update: (id:string, data: Partial<ISynonym>) => patch(`synonym/${id}`, data),
        remove: (id:string) => remove(`synonym/${id}`),
    }
});
