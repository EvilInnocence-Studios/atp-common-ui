import { ISettingsModule } from "@common/lib/setting/types";

export const cmsSettings:ISettingsModule = {
    Content: {
        "theme.cmsWidth": {
            displayName: "CMS Content Width",
            type: "string",
            defaultValue: 800,
            description: "The maximum width for CMS content areas.",
        }
    }
}