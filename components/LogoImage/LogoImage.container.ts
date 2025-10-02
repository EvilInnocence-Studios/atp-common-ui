import { createInjector, inject, mergeProps } from "unstateless";
import {LogoImageComponent} from "./LogoImage.component";
import {ILogoImageInputProps, LogoImageProps, ILogoImageProps} from "./LogoImage.d";

const injectLogoImageProps = createInjector(({}:ILogoImageInputProps):ILogoImageProps => {
    return {};
});

const connect = inject<ILogoImageInputProps, LogoImageProps>(mergeProps(
    injectLogoImageProps,
));

export const LogoImage = connect(LogoImageComponent);
