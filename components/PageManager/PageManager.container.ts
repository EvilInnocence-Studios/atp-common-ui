import { createInjector, inject, mergeProps } from "unstateless";
import {PageManagerComponent} from "./PageManager.component";
import {IPageManagerInputProps, PageManagerProps, IPageManagerProps} from "./PageManager.d";

const injectPageManagerProps = createInjector(({}:IPageManagerInputProps):IPageManagerProps => {
    return {};
});

const connect = inject<IPageManagerInputProps, PageManagerProps>(mergeProps(
    injectPageManagerProps,
));

export const PageManager = connect(PageManagerComponent);
