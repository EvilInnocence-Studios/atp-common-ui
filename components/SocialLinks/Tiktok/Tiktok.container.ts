import { createInjector, inject, mergeProps } from "unstateless";
import {TiktokComponent} from "./Tiktok.component";
import {ITiktokInputProps, TiktokProps, ITiktokProps} from "./Tiktok.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { TiktokPropEditor } from "./Tiktok.props";

const injectTiktokProps = createInjector(({}:ITiktokInputProps):ITiktokProps => {
    return {};
});

const connect = inject<ITiktokInputProps, TiktokProps>(mergeProps(
    injectTiktokProps,
));
export const connectTiktok = connect;

export const Tiktok = withLayoutMetadata(
    overridable<ITiktokInputProps>(connect(TiktokComponent)),
    {
        name: "Tiktok",
        displayName: "Tiktok",
        category: "Social",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: TiktokPropEditor,
    }
);
