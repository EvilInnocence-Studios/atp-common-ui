export declare interface ISettingProps {
    setting: string;
}

// What gets passed into the component from the parent as attributes
export declare interface ISettingInputProps {
    id: string;
}

export type SettingProps = ISettingInputProps & ISettingProps;