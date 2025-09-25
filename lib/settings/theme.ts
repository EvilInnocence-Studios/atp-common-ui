import { ISettingsModule } from "../setting/types";
import { colorSettings } from "./theme/colors";

export const themeSettings:ISettingsModule = {
    ...colorSettings,
};
