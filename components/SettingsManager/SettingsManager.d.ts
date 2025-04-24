import { ISetting } from "@common-shared/setting/types";
import { Index } from "ts-functional/dist/types";

export declare interface ISettingsManagerProps {
    settings: Index<ISetting>;
    update: (key:string) => (value:string) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ISettingsManagerInputProps {

}

export type SettingsManagerProps = ISettingsManagerInputProps & ISettingsManagerProps;