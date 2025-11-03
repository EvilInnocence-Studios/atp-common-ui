import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { CopyrightComponent } from "./Copyright.component";
import { CopyrightProps, ICopyrightInputProps, ICopyrightProps } from "./Copyright.d";

const injectCopyrightProps = createInjector(({}:ICopyrightInputProps):ICopyrightProps => {
    const copyright = useSetting("copyrightStatement");

    return {copyright: (copyright || "").replace("{year}", new Date().getFullYear().toString())};
});

const connect = inject<ICopyrightInputProps, CopyrightProps>(mergeProps(
    injectCopyrightProps,
));

export const Copyright = overridable<ICopyrightInputProps>(connect(CopyrightComponent));
