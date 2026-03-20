import { IModule } from "@core/lib/module";
import { ComponentRegistry } from "@theming/lib/layout/componentRegistry";
import { BlueskyFeed } from "./components/BlueskyFeed";
import { Copyright } from "./components/Copyright";
import { LinkList } from "./components/LinkList";
import { LogoSpinner } from "./components/LogoSpinner";
import { MailchimpForm } from "./components/MailchimpForm";
import { MailchimpPopup } from "./components/MailchimpPopup";
import { MediaImage } from "./components/MediaImage";
import { RoutedCMSPage } from "./components/RoutedCMSPage";
import { SocialLinks } from "./components/SocialLinks";
import { Bluesky } from "./components/SocialLinks/Bluesky";
import { Facebook } from "./components/SocialLinks/Facebook";
import { Instagram } from "./components/SocialLinks/Instagram";
import { Kofi } from "./components/SocialLinks/Kofi";
import { Patreon } from "./components/SocialLinks/Patreon";
import { Tiktok } from "./components/SocialLinks/Tiktok";
import { Twitter } from "./components/SocialLinks/Twitter";
import { Youtube } from "./components/SocialLinks/Youtube";
import { commonMenus } from "./lib/menus";
import { commonRoutes } from "./lib/routes";
import { commonSettings } from "./lib/settings";

export const module: IModule = {
    name: "common",
    menus: commonMenus,
    routes: commonRoutes,
    settings: commonSettings,
};

ComponentRegistry.register(LinkList);
ComponentRegistry.register("MailchimpForm", MailchimpForm, { category: "Social", displayName: "Mailchimp Form" });
ComponentRegistry.register("MailchimpPopup", MailchimpPopup, { category: "Social", displayName: "Mailchimp Popup" });
ComponentRegistry.register("Copyright", Copyright, { category: "Content", displayName: "Copyright" });
ComponentRegistry.register("SocialLinks", SocialLinks, { category: "Social", displayName: "Social Links" });
ComponentRegistry.register(BlueskyFeed);
ComponentRegistry.register("LogoSpinner", LogoSpinner, { category: "Misc", displayName: "Logo Spinner" });
ComponentRegistry.register(MediaImage);
ComponentRegistry.register(RoutedCMSPage);
ComponentRegistry.register(Bluesky);
ComponentRegistry.register(Twitter);
ComponentRegistry.register(Facebook);
ComponentRegistry.register(Instagram);
ComponentRegistry.register(Kofi);
ComponentRegistry.register(Patreon);
ComponentRegistry.register(Youtube);
ComponentRegistry.register(Tiktok);