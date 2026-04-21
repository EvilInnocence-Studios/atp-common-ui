import { ISettingContainer } from "./setting/types";
import { analyticsSettings } from "./settings/analytics";
import { contentSettings } from "./settings/content";
import { ecommerceSettings } from "./settings/ecommerce";
import { emailSettings } from "./settings/email";
import { siteInfoSettings } from "./settings/siteInfo";

export const commonSettings:ISettingContainer = {
    "General": {
        ...siteInfoSettings,
        ...analyticsSettings,
        ...emailSettings,
    },
    "Content": {
        ...contentSettings,
    },
    "Ecommerce": {
        ...ecommerceSettings,
    },
}
