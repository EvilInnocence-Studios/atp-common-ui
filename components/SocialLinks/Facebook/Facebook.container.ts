import { createInjector, inject, mergeProps } from "unstateless";
import {FacebookComponent} from "./Facebook.component";
import {IFacebookInputProps, FacebookProps, IFacebookProps} from "./Facebook.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { FacebookPropEditor } from "./Facebook.props";

const injectFacebookProps = createInjector(({}:IFacebookInputProps):IFacebookProps => {
    return {};
});

const connect = inject<IFacebookInputProps, FacebookProps>(mergeProps(
    injectFacebookProps,
));
export const connectFacebook = connect;

export const Facebook = withLayoutMetadata(
    overridable<IFacebookInputProps>(connect(FacebookComponent)),
    {
        name: "Facebook",
        displayName: "Facebook",
        category: "Social",
        subCategory: "Links",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: FacebookPropEditor,
    }
);
