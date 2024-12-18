import { createInjector, inject, mergeProps } from "unstateless";
import {TagManagerComponent} from "./TagManager.component";
import {ITagManagerInputProps, TagManagerProps, ITagManagerProps} from "./TagManager.d";

const injectTagManagerProps = createInjector(({}:ITagManagerInputProps):ITagManagerProps => {
    return {};
});

const connect = inject<ITagManagerInputProps, TagManagerProps>(mergeProps(
    injectTagManagerProps,
));

export const TagManager = connect(TagManagerComponent);
