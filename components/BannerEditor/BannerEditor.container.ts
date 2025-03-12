import { createInjector, inject, mergeProps } from "unstateless";
import {BannerEditorComponent} from "./BannerEditor.component";
import {IBannerEditorInputProps, BannerEditorProps, IBannerEditorProps} from "./BannerEditor.d";
import { useUpdater } from "@core/lib/useUpdater";
import { IBanner } from "@common-shared/banner/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";

const injectBannerEditorProps = createInjector(({bannerId, onDelete}:IBannerEditorInputProps):IBannerEditorProps => {
    const loader = useLoaderAsync();

    const updater = useUpdater<IBanner>(
        "banner",
        bannerId,
        {} as IBanner,
        services().banner.get,
        services().banner.update,
        "manual"
    );

    const remove = () => {
        services().banner.remove(bannerId).then(() => {
            flash.success("Banner removed");
            onDelete();
        });
    }

    const upload = (file: File) => {
        loader(() => services().banner.replace(updater.history.entity.id, file)
            .then(updater.refresh)
            .then(flash.success("Banner replaced"))
        );
    }

    
    return {
        banner:updater.history.entity,
        ...updater,
        isLoading: updater.isLoading || loader.isLoading,
        remove,
        upload,
    };
});

const connect = inject<IBannerEditorInputProps, BannerEditorProps>(mergeProps(
    injectBannerEditorProps,
));

export const BannerEditor = connect(BannerEditorComponent);
