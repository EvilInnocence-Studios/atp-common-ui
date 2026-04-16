import { createInjector, inject, mergeProps } from "unstateless";
import {InstagramComponent} from "./Instagram.component";
import {IInstagramInputProps, InstagramProps, IInstagramProps} from "./Instagram.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { InstagramPropEditor } from "./Instagram.props";

const injectInstagramProps = createInjector(({}:IInstagramInputProps):IInstagramProps => {
    return {};
});

const connect = inject<IInstagramInputProps, InstagramProps>(mergeProps(
    injectInstagramProps,
));
export const connectInstagram = connect;

export const Instagram = withLayoutMetadata(
    overridable<IInstagramInputProps>(connect(InstagramComponent)),
    {
        name: "Instagram",
        displayName: "Instagram",
        category: "Social",
        subCategory: "Links",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: InstagramPropEditor,
    }
);
