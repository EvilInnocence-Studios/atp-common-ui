import { IModule } from "@core-shared/module";
import { commonMenus } from "./lib/menus";
import { commonRoutes } from "./lib/routes";
import { commonSettings } from "./lib/settings";

export const module:IModule = {
    name: "common",
    menus: commonMenus,
    routes: commonRoutes,
    settings: commonSettings,
};