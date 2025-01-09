import { createInjector, inject, mergeProps } from "unstateless";
import {BannerComponent} from "./Banner.component";
import {IBannerInputProps, BannerProps, IBannerProps} from "./Banner.d";

const injectBannerProps = createInjector(({}:IBannerInputProps):IBannerProps => {
    return {};
});

const connect = inject<IBannerInputProps, BannerProps>(mergeProps(
    injectBannerProps,
));

export const Banner = connect(BannerComponent);
