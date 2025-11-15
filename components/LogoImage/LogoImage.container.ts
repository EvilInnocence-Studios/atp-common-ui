import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { LogoImageComponent } from "./LogoImage.component";
import { ILogoImageInputProps, ILogoImageProps, LogoImageProps } from "./LogoImage.d";

const injectLogoImageProps = createInjector(({}:ILogoImageInputProps):ILogoImageProps => {
    return {};
});

const connect = inject<ILogoImageInputProps, LogoImageProps>(mergeProps(
    injectLogoImageProps,
));
export const connectLogoImage = connect;

export const LogoImage = overridable<ILogoImageInputProps>(connect(LogoImageComponent));
