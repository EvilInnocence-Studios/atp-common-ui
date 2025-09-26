import { ISettingsModule } from "../setting/types";

export const layoutSettings:ISettingsModule = {
    Homepage: {
        "homepage.showLargeBanners": {
            displayName: "Show Large Banners",
            type: "boolean",
            defaultValue: true,
            description: "Show the large banners on the homepage."
        },
        "homepage.showSmallBanners": {
            displayName: "Show Small Banners",
            type: "boolean",
            defaultValue: true,
            description: "Show the small banners on the homepage."
        },
    }
}