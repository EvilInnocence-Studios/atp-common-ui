import { createInjector, inject, mergeProps } from "unstateless";
import {TwitterComponent} from "./Twitter.component";
import {ITwitterInputProps, TwitterProps, ITwitterProps} from "./Twitter.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { TwitterPropEditor } from "./Twitter.props";

const injectTwitterProps = createInjector(({}:ITwitterInputProps):ITwitterProps => {
    return {};
});

const connect = inject<ITwitterInputProps, TwitterProps>(mergeProps(
    injectTwitterProps,
));
export const connectTwitter = connect;

export const Twitter = withLayoutMetadata(
    overridable<ITwitterInputProps>(connect(TwitterComponent)),
    {
        name: "Twitter",
        displayName: "Twitter",
        category: "Social",
        subCategory: "Links",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: TwitterPropEditor,
    }
);
