import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { LinkListSelectComponent } from "./LinkListSelect.component";
import { ILinkListSelectInputProps, ILinkListSelectProps, LinkListSelectProps } from "./LinkListSelect.d";

const injectLinkListSelectProps = createInjector(({}:ILinkListSelectInputProps):ILinkListSelectProps => {
    const [lists, setLists] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        services().linkList.search().then(lists => {
            setLists(lists.map(list => ({value: list.key, label: list.name})));
        });
    }, []);
    
    return {lists};
});

const connect = inject<ILinkListSelectInputProps, LinkListSelectProps>(mergeProps(
    injectLinkListSelectProps,
));
export const connectLinkListSelect = connect;

export const LinkListSelect = overridable<ILinkListSelectInputProps>(connect(LinkListSelectComponent));
