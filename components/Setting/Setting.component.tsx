import { overridable } from "@core/lib/overridable";
import { SettingProps } from "./Setting.d";

export const SettingComponent = overridable(({setting}:SettingProps) =><>{setting}</>);
