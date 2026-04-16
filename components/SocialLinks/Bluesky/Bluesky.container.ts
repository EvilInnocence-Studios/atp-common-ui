import { createInjector, inject, mergeProps } from "unstateless";
import {BlueskyComponent} from "./Bluesky.component";
import {IBlueskyInputProps, BlueskyProps, IBlueskyProps} from "./Bluesky.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { BlueskyPropEditor } from "./Bluesky.props";

const injectBlueskyProps = createInjector(({}:IBlueskyInputProps):IBlueskyProps => {
    return {};
});

const connect = inject<IBlueskyInputProps, BlueskyProps>(mergeProps(
    injectBlueskyProps,
));
export const connectBluesky = connect;

export const Bluesky = withLayoutMetadata(
    overridable<IBlueskyInputProps>(connect(BlueskyComponent)),
    {
        name: "Bluesky",
        displayName: "Bluesky",
        category: "Social",
        subCategory: "Links",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: BlueskyPropEditor,
    }
);
