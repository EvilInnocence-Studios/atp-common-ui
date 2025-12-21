import { ISetting } from "@common-shared/setting/types";
import { services } from "@core/lib/api";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { useEffect } from "react";
import { find, memoize, memoizePromise } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { useSharedState } from "unstateless";

const useSettingsRaw = useSharedState<Index<string>>('settings', {});

export const settingServices = memoize(({ get, post, put, patch, remove }: IMethods) => ({
    setting: {
        search: (): Promise<ISetting[]> => get(`setting`).then(getResults),
        searchMemoized: memoizePromise((): Promise<ISetting[]> => get(`setting`).then(getResults)),
        create: (key: string, value: any): Promise<ISetting> => post(`setting`, { key, value }),
        update: (id: string, value: any): Promise<ISetting> => patch(`setting/${id}`, { value }),
        updateByKey: (key: string, value: any): Promise<ISetting> => get(`setting`)
            .then(getResults)
            .then(find((s:ISetting) => s.key === key))
            .then((setting?:ISetting) => !!setting
                ? patch(`setting/${setting.id}`, { value })
                : post(`setting`, { key, value }).then(getResults)
            ),
        remove: (id: string) => remove(`setting/${id}`),
        get: (key:string):Promise<string> => {
            if (key in useSettingsRaw.getValue()) {
                return Promise.resolve(useSettingsRaw.getValue()[key]);
            }
            // Load all settings and cache them onto the target
            return settingServices({get, post, put, patch, remove}).setting.searchMemoized()
                .then((settings:ISetting[]) => {
                    const newSettings:Index<string> = {};
                    settings.forEach(({ key, value }) => {
                        newSettings[key] = value;
                    });
                    useSettingsRaw.setValue(newSettings);
                    return newSettings[key];
                });
        }
    },
}), {});

export const useSetting = (key:string | null):string => {
    const [settings] = useSettingsRaw();

    useEffect(() => {
        if(key) {
            services().setting.get(key)
        }
    }, []);

    return key ? settings[key] : "";
}

export const useSettingGroup = (prefix:string):Index<string> => {
    const [settings] = useSettingsRaw();

    useEffect(() => {
        services().setting.get("__dummy__");
    }, []);

    return Object.keys(settings)
        .filter(k => k.startsWith(`${prefix}.`))
        .reduce((obj, k) => {
            obj[k.replace(`${prefix}.`, '')] = settings[k];
            return obj;
        }, {} as Index<string>);
}
