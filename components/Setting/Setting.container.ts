import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { SettingComponent } from "./Setting.component";
import { ISettingInputProps, ISettingProps, SettingProps } from "./Setting.d";

const injectSettingProps = createInjector(({id}:ISettingInputProps):ISettingProps => {
    const setting = useSetting(id);
    
    return {setting};
});

const connect = inject<ISettingInputProps, SettingProps>(mergeProps(
    injectSettingProps,
));

export const Setting = overridable<ISettingInputProps>(connect(SettingComponent));
