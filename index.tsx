import { ComponentRegistry } from "@core/lib/layout/componentRegistry";
import { IModule } from "@core/lib/module";
import { BlueskyFeed } from "./components/BlueskyFeed";
import { Copyright } from "./components/Copyright";
import { LinkList } from "./components/LinkList";
import { LogoSpinner } from "./components/LogoSpinner";
import { MailchimpForm } from "./components/MailchimpForm";
import { MailchimpPopup } from "./components/MailchimpPopup";
import { SocialLinks } from "./components/SocialLinks";
import { commonMenus } from "./lib/menus";
import { commonRoutes } from "./lib/routes";
import { commonSettings } from "./lib/settings";

export const module: IModule = {
    name: "common",
    menus: commonMenus,
    routes: commonRoutes,
    settings: commonSettings,
};

ComponentRegistry.register("LinkList", LinkList, { category: "Layouts", displayName: "Link List" });
ComponentRegistry.register("MailchimpForm", MailchimpForm, { category: "Layouts", displayName: "Mailchimp Form" });
ComponentRegistry.register("MailchimpPopup", MailchimpPopup, { category: "Layouts", displayName: "Mailchimp Popup" });
ComponentRegistry.register("Copyright", Copyright, { category: "Layouts", displayName: "Copyright" });
ComponentRegistry.register("SocialLinks", SocialLinks, { category: "Layouts", displayName: "Social Links" });
ComponentRegistry.register("BlueSkyFeed", BlueskyFeed, { category: "Layouts", displayName: "BlueSky Feed" });
ComponentRegistry.register("LogoSpinner", LogoSpinner, { category: "Layouts", displayName: "Logo Spinner" });
