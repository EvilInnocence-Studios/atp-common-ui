import { createInjector, inject, mergeProps } from "unstateless";
import {YoutubeComponent} from "./Youtube.component";
import {IYoutubeInputProps, YoutubeProps, IYoutubeProps} from "./Youtube.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { YoutubePropEditor } from "./Youtube.props";

const injectYoutubeProps = createInjector(({}:IYoutubeInputProps):IYoutubeProps => {
    return {};
});

const connect = inject<IYoutubeInputProps, YoutubeProps>(mergeProps(
    injectYoutubeProps,
));
export const connectYoutube = connect;

export const Youtube = withLayoutMetadata(
    overridable<IYoutubeInputProps>(connect(YoutubeComponent)),
    {
        name: "Youtube",
        displayName: "Youtube",
        category: "Social",
        subCategory: "Links",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: YoutubePropEditor,
    }
);
