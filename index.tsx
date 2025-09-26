import { IModule } from "@core/lib/module";
import { BannerList } from "./components/BannerList";
import { commonMenus } from "./lib/menus";
import { commonRoutes } from "./lib/routes";
import { useSetting } from "./lib/setting/services";
import { commonSettings } from "./lib/settings";
import { rendererPlugins } from "@core/lib/plugins/renderer";

export const module:IModule = {
    name: "common",
    menus: commonMenus,
    routes: commonRoutes,
    settings: commonSettings,
};

export const sitePlugins = {
    homepage: rendererPlugins(),
};

sitePlugins.homepage.register(99, () => {
    const showBanners = useSetting("homepage.showLargeBanners") === "true";
    return showBanners ? <BannerList tag="homepageLarge" columns={2} /> : null;
});
sitePlugins.homepage.register(98, () => {
    const showBanners = useSetting("homepage.showSmallBanners") === "true";
    return showBanners ? <BannerList tag="homepageSmall" columns={3} /> : null;
});
