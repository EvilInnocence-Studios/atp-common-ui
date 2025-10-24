import { createInjector, inject, mergeProps } from "unstateless";
import {CopyrightComponent} from "./Copyright.component";
import {ICopyrightInputProps, CopyrightProps, ICopyrightProps} from "./Copyright.d";
import { useSetting } from "@common/lib/setting/services";

const injectCopyrightProps = createInjector(({}:ICopyrightInputProps):ICopyrightProps => {
    const copyright = useSetting("copyrightStatement");

    return {copyright: copyright.replace("{year}", new Date().getFullYear().toString())};
});

const connect = inject<ICopyrightInputProps, CopyrightProps>(mergeProps(
    injectCopyrightProps,
));

export const Copyright = connect(CopyrightComponent);
