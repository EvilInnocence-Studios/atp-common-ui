import { ISetting } from "@common-shared/setting/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";

export const settingServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    setting: {
        search: ():Promise<ISetting[]> => get(`setting`).then(getResults),
        create: (key:string, value:any):Promise<ISetting> => post(`setting`, {key, value}),
        update: (id:string, value:any):Promise<ISetting> => patch(`setting/${id}`, {value}),
        remove: (id:string) => remove(`setting/${id}`),
    }
});
