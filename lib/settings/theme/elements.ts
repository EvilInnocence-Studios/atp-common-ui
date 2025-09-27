import { ISettingsModule } from "@common/lib/setting/types";

export const elementSettings:ISettingsModule = {
    Elements: {
        "theme.borderRadius": {
            displayName: "Border Radius",
            type: "string",
            defaultValue: 5,
            description: "The border radius used for rounded elements.",
        },
        "theme.borderRadiusLarge": {
            displayName: "Large Border Radius",
            type: "string",
            defaultValue: 10,
            description: "A larger border radius used for more rounded elements.",
        },
    }
}