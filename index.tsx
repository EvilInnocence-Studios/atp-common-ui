import { IModule } from "@core/lib/module";
import { ComponentRegistry } from "@theming/lib/layout/componentRegistry";
import { BlueskyFeed } from "./components/BlueskyFeed";
import { LinkList } from "./components/LinkList";
import { LogoSpinner } from "./components/LogoSpinner";
import { MailchimpForm } from "./components/MailchimpForm";
import { MailchimpPopup } from "./components/MailchimpPopup";
import { MediaImage } from "./components/MediaImage";
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
ComponentRegistry.register(MailchimpForm);
ComponentRegistry.register("MailchimpPopup", MailchimpPopup, { category: "Marketing", subCategory: "Email", displayName: "Mailchimp Popup" });
ComponentRegistry.register(BlueskyFeed);
ComponentRegistry.register("LogoSpinner", LogoSpinner, { category: "Social", subCategory:"Branding", displayName: "Logo Spinner" });
ComponentRegistry.register(MediaImage);
ComponentRegistry.register(Bluesky);
ComponentRegistry.register(Twitter);
ComponentRegistry.register(Facebook);
ComponentRegistry.register(Instagram);
ComponentRegistry.register(Kofi);
ComponentRegistry.register(Patreon);
ComponentRegistry.register(Youtube);
ComponentRegistry.register(Tiktok);