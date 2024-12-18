import { createInjector, inject, mergeProps } from "unstateless";
import {HomePageComponent} from "./HomePage.component";
import {IHomePageInputProps, HomePageProps, IHomePageProps} from "./HomePage.d";

const injectHomePageProps = createInjector(({}:IHomePageInputProps):IHomePageProps => {
    return {};
});

const connect = inject<IHomePageInputProps, HomePageProps>(mergeProps(
    injectHomePageProps,
));

export const HomePage = connect(HomePageComponent);
