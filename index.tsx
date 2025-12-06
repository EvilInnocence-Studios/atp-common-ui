import { ComponentRegistry, leafLayoutComponent } from "@core/lib/layout/componentRegistry";
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

ComponentRegistry.register(leafLayoutComponent(LinkList));
ComponentRegistry.register("MailchimpForm", leafLayoutComponent(MailchimpForm), { category: "Layouts", displayName: "Mailchimp Form" });
ComponentRegistry.register("MailchimpPopup", leafLayoutComponent(MailchimpPopup), { category: "Layouts", displayName: "Mailchimp Popup" });
ComponentRegistry.register("Copyright", leafLayoutComponent(Copyright), { category: "Layouts", displayName: "Copyright" });
ComponentRegistry.register("SocialLinks", leafLayoutComponent(SocialLinks), { category: "Layouts", displayName: "Social Links" });
ComponentRegistry.register("BlueSkyFeed", leafLayoutComponent(BlueskyFeed), { category: "Layouts", displayName: "BlueSky Feed" });
ComponentRegistry.register("LogoSpinner", leafLayoutComponent(LogoSpinner), { category: "Layouts", displayName: "Logo Spinner" });
