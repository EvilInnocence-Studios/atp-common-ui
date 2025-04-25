import { ISetting } from "@common-shared/setting/types";
import { services } from "@core/lib/api";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { useEffect } from "react";
import { Index } from "ts-functional/dist/types";
import { useSharedState } from "unstateless";

const useSettingsRaw = useSharedState<Index<string>>('settings', {});

export const settingServices = ({ get, post, /*put,*/ patch, remove }: IMethods) => ({
    setting: {
        search: (): Promise<ISetting[]> => get(`setting`).then(getResults),
        create: (key: string, value: any): Promise<ISetting> => post(`setting`, { key, value }),
        update: (id: string, value: any): Promise<ISetting> => patch(`setting/${id}`, { value }),
        remove: (id: string) => remove(`setting/${id}`),
        get: (key:string):Promise<string> => {
            if (key in useSettingsRaw.getValue()) {
                return Promise.resolve(useSettingsRaw.getValue()[key]);
            }
            // Load all settings and cache them onto the target
            return get(`setting`).then(getResults).then((settings:ISetting[]) => {
                const newSettings:Index<string> = {};
                settings.forEach(({ key, value }) => {
                    newSettings[key] = value;
                });
                useSettingsRaw.setValue(newSettings);
                return newSettings[key];
            });
        }
    },
});

export const useSetting = (key:string):string => {
    const [settings] = useSettingsRaw();

    useEffect(() => {services().setting.get(key)}, []);

    return settings[key];
}