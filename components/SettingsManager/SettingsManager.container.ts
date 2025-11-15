import { ISetting } from "@common-shared/setting/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { Index } from "ts-functional/dist/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { SettingsManagerComponent } from "./SettingsManager.component";
import { ISettingsManagerInputProps, ISettingsManagerProps, SettingsManagerProps } from "./SettingsManager.d";

const injectSettingsManagerProps = createInjector(({}:ISettingsManagerInputProps):ISettingsManagerProps => {
    const [settings, setSettings] = useState<Index<ISetting>>({});
    const loader = useLoaderAsync();

    const refresh = () => {
        loader(() => services().setting.search().then((settings) => {
            const settingsMap = settings.reduce((acc:Index<ISetting>, setting:ISetting) => {
                acc[setting.key] = setting;
                return acc;
            }, {});
            setSettings(settingsMap);
        }));
    };

    useEffect(refresh, []);

    const update = (key:string) => (value:string) => {
        if(!settings[key]) {
            loader(() => services().setting.create(key, value)
                .then(refresh)
            );
        } else {
            loader(() => services().setting.update(settings[key].id, value)
                .then(refresh)
            );
        }
    };
    
    return {settings, update};
});

const connect = inject<ISettingsManagerInputProps, SettingsManagerProps>(mergeProps(
    injectSettingsManagerProps,
));
export const connectSettingsManager = connect;

export const SettingsManager = overridable<ISettingsManagerInputProps>(connect(SettingsManagerComponent));
