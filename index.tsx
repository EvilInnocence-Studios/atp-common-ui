import { IModule } from "@core/lib/module";
import { commonMenus } from "./lib/menus";
import { commonRoutes } from "./lib/routes";
import { commonSettings } from "./lib/settings";

export const module:IModule = {
    name: "common",
    menus: commonMenus,
    routes: commonRoutes,
    settings: commonSettings,
};