import { ISettingsModule } from "@common/lib/setting/types";

export const spacingSettings:ISettingsModule = {
    Spacing: {
        "theme.padding": {
            displayName: "Default Padding",
            type: "string",
            defaultValue: 10,
            description: "The default padding used throughout the app.",
        },
        "theme.paddingSmall": {
            displayName: "Small Padding",
            type: "string",
            defaultValue: 5,
            description: "A smaller padding used for compact elements.",
        },
        "theme.paddingLarge": {
            displayName: "Large Padding",
            type: "string",
            defaultValue: 15,
            description: "A larger padding used for spacious elements.",
        },
        "theme.paddingXS": {
            displayName: "Extra Small Padding",
            type: "string",
            defaultValue: 2,
            description: "An extra small padding used for very compact elements.",
        }
    }
}