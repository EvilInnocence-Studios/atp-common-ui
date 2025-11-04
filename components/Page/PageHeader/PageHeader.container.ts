import { createInjector, inject, mergeProps } from "unstateless";
import {PageHeaderComponent} from "./PageHeader.component";
import {IPageHeaderInputProps, PageHeaderProps, IPageHeaderProps} from "./PageHeader.d";
import { overridable } from "@core/lib/overridable";

const injectPageHeaderProps = createInjector(({}:IPageHeaderInputProps):IPageHeaderProps => {
    return {};
});

const connect = inject<IPageHeaderInputProps, PageHeaderProps>(mergeProps(
    injectPageHeaderProps,
));

export const PageHeader = overridable<IPageHeaderInputProps>(connect(PageHeaderComponent));
