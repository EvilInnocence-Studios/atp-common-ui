import { ISettingsModule } from "../setting/types";
import { cmsSettings } from "./theme/cms";
import { colorSettings } from "./theme/colors";
import { elementSettings } from "./theme/elements";
import { spacingSettings } from "./theme/spacing";
import { textSettings } from "./theme/text";

export const themeSettings:ISettingsModule = {
    ...colorSettings,
    ...textSettings,
    ...spacingSettings,
    ...elementSettings,
    ...cmsSettings,
};
