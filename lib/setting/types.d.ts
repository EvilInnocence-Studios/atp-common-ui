export declare interface ISettingContainer {
    [module: string]: ISettingsModule;
}

export declare interface ISettingsModule {
    [screen: string]: ISettingsScreen;
}

export declare interface ISettingsScreen {
    [setting: string]: ISettingDescriptor;
}

export declare interface ISettingOption {
    value: string;
    label: string;
}

export declare interface ISettingDescriptor {
    displayName: string;
    type: "string" | "integer" | "decimal" | "boolean" | "select" | "text";
    defaultValue?: any;
    description?: string;
    options?: () => Promise<ISettingOption[]>;
}