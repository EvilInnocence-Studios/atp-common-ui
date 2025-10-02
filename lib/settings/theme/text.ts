import { ISettingsModule } from "@common/lib/setting/types";

export const textSettings:ISettingsModule = {
    Text: {
        "theme.textSizeDefault": {
            displayName: "Default Text Size",
            type: "string",
            defaultValue: 14,
            description: "The default size for text.",
        },
        "theme.textSizeSmall": {
            displayName: "Small Text Size",
            type: "string",
            defaultValue: 12,
            description: "The size for small text.",
        },
        "theme.textSizeLarge": {
            displayName: "Large Text Size",
            type: "string",
            defaultValue: 18,
            description: "The size for large text.",
        },
        "theme.textSizeXS": {
            displayName: "Extra Small Text Size",
            type: "string",
            defaultValue: 10,
            description: "The size for extra small text.",
        },
        "theme.textSizeXL": {
            displayName: "Extra Large Text Size",
            type: "string",
            defaultValue: 22,
            description: "The size for extra large text.",
        },
        "theme.defaultFont": {
            displayName: "Default Font Family",
            type: "string",
            defaultValue: "Arial, sans-serif",
            description: "The default font family used for text.",
        },
        "theme.headerFont": {
            displayName: "Header Font Family",
            type: "string",
            defaultValue: "Helvetica, sans-serif",
            description: "The font family used for headers.",
        }
    }
}