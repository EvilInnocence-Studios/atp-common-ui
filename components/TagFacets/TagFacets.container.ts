import { useTagGroups } from "@common/lib/useTagGroups";
import { useToggleList } from "@core/lib/useToggle";
import { createInjector, inject, mergeProps } from "unstateless";
import { TagFacetsComponent } from "./TagFacets.component";
import { ITagFacetsInputProps, ITagFacetsProps, TagFacetsProps } from "./TagFacets.d";

const injectTagFacetsProps = createInjector(({}:ITagFacetsInputProps):ITagFacetsProps => {
    const tagGroups = useTagGroups();
    const toggles = useToggleList({});

    return {...tagGroups, toggles};
});

const connect = inject<ITagFacetsInputProps, TagFacetsProps>(mergeProps(
    injectTagFacetsProps,
));

export const TagFacets = connect(TagFacetsComponent);
