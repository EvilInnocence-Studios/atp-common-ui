import { useTagGroups } from "@common/lib/useTagGroups";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { SelectedTagsComponent } from "./SelectedTags.component";
import { ISelectedTagsInputProps, SelectedTagsProps } from "./SelectedTags.d";

const injectSelectedTagsProps = createInjector(useTagGroups);

const connect = inject<ISelectedTagsInputProps, SelectedTagsProps>(mergeProps(
    injectSelectedTagsProps,
));

export const SelectedTags = overridable<ISelectedTagsInputProps>(connect(SelectedTagsComponent));
