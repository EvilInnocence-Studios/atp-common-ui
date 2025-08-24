import { createInjector, inject, mergeProps } from "unstateless";
import {CopyrightComponent} from "./Copyright.component";
import {ICopyrightInputProps, CopyrightProps, ICopyrightProps} from "./Copyright.d";

const injectCopyrightProps = createInjector(({}:ICopyrightInputProps):ICopyrightProps => {
    return {};
});

const connect = inject<ICopyrightInputProps, CopyrightProps>(mergeProps(
    injectCopyrightProps,
));

export const Copyright = connect(CopyrightComponent);
