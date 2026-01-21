import { createInjector, inject, mergeProps } from "unstateless";
import {RoutedCMSPageComponent} from "./RoutedCMSPage.component";
import {IRoutedCMSPageInputProps, RoutedCMSPageProps, IRoutedCMSPageProps} from "./RoutedCMSPage.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { useParams } from "react-router";

const injectRoutedCMSPageProps = createInjector(({}:IRoutedCMSPageInputProps):IRoutedCMSPageProps => {
    const {slug} = useParams();
    
    return {slug: slug || ""};
});

const connect = inject<IRoutedCMSPageInputProps, RoutedCMSPageProps>(mergeProps(
    injectRoutedCMSPageProps,
));
export const connectRoutedCMSPage = connect;

export const RoutedCMSPage = withLayoutMetadata(
    overridable<IRoutedCMSPageInputProps>(connect(RoutedCMSPageComponent)),
    {
        name: "RoutedCMSPage",
        displayName: "CMS Page",
        category: "Content",
        description: "",
        icon,
    }
);
