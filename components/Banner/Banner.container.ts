import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { BannerComponent } from "./Banner.component";
import { BannerProps, IBannerInputProps, IBannerProps } from "./Banner.d";

const injectBannerProps = createInjector(({}:IBannerInputProps):IBannerProps => {
    return {};
});

const connect = inject<IBannerInputProps, BannerProps>(mergeProps(
    injectBannerProps,
));
export const connectBanner = connect;

export const Banner = overridable<IBannerInputProps>(connect(BannerComponent));
