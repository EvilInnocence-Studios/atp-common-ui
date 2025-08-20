import { createInjector, inject, mergeProps } from "unstateless";
import {SettingComponent} from "./Setting.component";
import {ISettingInputProps, SettingProps, ISettingProps} from "./Setting.d";
import { useSetting } from "@common/lib/setting/services";

const injectSettingProps = createInjector(({id}:ISettingInputProps):ISettingProps => {
    const setting = useSetting(id);
    
    return {setting};
});

const connect = inject<ISettingInputProps, SettingProps>(mergeProps(
    injectSettingProps,
));

export const Setting = connect(SettingComponent);
