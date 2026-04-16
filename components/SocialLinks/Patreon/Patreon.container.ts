import { createInjector, inject, mergeProps } from "unstateless";
import {PatreonComponent} from "./Patreon.component";
import {IPatreonInputProps, PatreonProps, IPatreonProps} from "./Patreon.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { PatreonPropEditor } from "./Patreon.props";

const injectPatreonProps = createInjector(({}:IPatreonInputProps):IPatreonProps => {
    return {};
});

const connect = inject<IPatreonInputProps, PatreonProps>(mergeProps(
    injectPatreonProps,
));
export const connectPatreon = connect;

export const Patreon = withLayoutMetadata(
    overridable<IPatreonInputProps>(connect(PatreonComponent)),
    {
        name: "Patreon",
        displayName: "Patreon",
        category: "Social",
        subCategory: "Links",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: PatreonPropEditor,
    }
);
