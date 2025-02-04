import { useTagGroups } from "@common/lib/useTagGroups";
import { createInjector, inject, mergeProps } from "unstateless";
import { TagFacetsComponent } from "./TagFacets.component";
import { ITagFacetsInputProps, TagFacetsProps } from "./TagFacets.d";

const injectTagFacetsProps = createInjector(useTagGroups);

const connect = inject<ITagFacetsInputProps, TagFacetsProps>(mergeProps(
    injectTagFacetsProps,
));

export const TagFacets = connect(TagFacetsComponent);
