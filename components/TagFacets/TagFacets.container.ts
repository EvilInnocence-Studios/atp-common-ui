import { useTagGroups } from "@common/lib/useTagGroups";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { TagFacetsComponent } from "./TagFacets.component";
import { ITagFacetsInputProps, ITagFacetsProps, TagFacetsProps } from "./TagFacets.d";

const injectTagFacetsProps = createInjector(({}:ITagFacetsInputProps):ITagFacetsProps => {
    const tagGroups = useTagGroups();

    return {...tagGroups};
});

const connect = inject<ITagFacetsInputProps, TagFacetsProps>(mergeProps(
    injectTagFacetsProps,
));
export const connectTagFacets = connect;

export const TagFacets = overridable<ITagFacetsInputProps>(connect(TagFacetsComponent));
