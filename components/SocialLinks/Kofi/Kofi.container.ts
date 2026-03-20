import { createInjector, inject, mergeProps } from "unstateless";
import {KofiComponent} from "./Kofi.component";
import {IKofiInputProps, KofiProps, IKofiProps} from "./Kofi.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { KofiPropEditor } from "./Kofi.props";

const injectKofiProps = createInjector(({}:IKofiInputProps):IKofiProps => {
    return {};
});

const connect = inject<IKofiInputProps, KofiProps>(mergeProps(
    injectKofiProps,
));
export const connectKofi = connect;

export const Kofi = withLayoutMetadata(
    overridable<IKofiInputProps>(connect(KofiComponent)),
    {
        name: "Kofi",
        displayName: "Kofi",
        category: "Social",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: KofiPropEditor,
    }
);
