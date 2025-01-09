import { createInjector, inject, mergeProps } from "unstateless";
import {BannerEditorComponent} from "./BannerEditor.component";
import {IBannerEditorInputProps, BannerEditorProps, IBannerEditorProps} from "./BannerEditor.d";
import { useUpdater } from "@core/lib/useUpdater";
import { IBanner } from "@common-shared/banner/types";
import { services } from "@core/lib/api";

const injectBannerEditorProps = createInjector(({bannerId}:IBannerEditorInputProps):IBannerEditorProps => {
    const updater = useUpdater<IBanner>(
        "banner",
        bannerId,
        {} as IBanner,
        services().banner.get,
        services().banner.update,
        "manual"
    );
    
    return {banner:updater.history.entity, ...updater};
});

const connect = inject<IBannerEditorInputProps, BannerEditorProps>(mergeProps(
    injectBannerEditorProps,
));

export const BannerEditor = connect(BannerEditorComponent);
