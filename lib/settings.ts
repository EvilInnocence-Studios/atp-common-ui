import { ISettingContainer } from "./setting/types";
import { analyticsSettings } from "./settings/analytics";
import { contentSettings } from "./settings/content";
import { ecommerceSettings } from "./settings/ecommerce";
import { emailSettings } from "./settings/email";
import { siteInfoSettings } from "./settings/siteInfo";
import { socialSettings } from "./settings/social";
import { themeSettings } from "./settings/theme";

export const commonSettings:ISettingContainer = {
    "General": {
        ...siteInfoSettings,
        ...analyticsSettings,
        ...emailSettings,
    },
    "Content": {
        ...contentSettings,
    },
    "Social": {
        ...socialSettings,
    },
    "Ecommerce": {
        ...ecommerceSettings,
    },
    "Theme": {
        ...themeSettings,
    }    
}
