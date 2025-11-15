import { IBanner } from "@common-shared/banner/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoader } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { BannerManagerComponent } from "./BannerManager.component";
import { BannerManagerProps, IBannerManagerInputProps, IBannerManagerProps } from "./BannerManager.d";

const injectBannerManagerProps = createInjector(({}:IBannerManagerInputProps):IBannerManagerProps => {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const [overwrite, setOverwrite] = useState(false);
    const loader = useLoader();

    const refresh = () => {
        loader.start();
        services().banner.search({}).then(setBanners).finally(loader.stop);
    }

    useEffect(refresh, []);

    const upload = (file: File) => {
        loader.start();
        services().banner.create(file, overwrite)
            .then(refresh)
            .finally(loader.stop);
    }
    
    return {banners, isLoading: loader.isLoading, upload, overwrite, setOverwrite, refresh};
});

const connect = inject<IBannerManagerInputProps, BannerManagerProps>(mergeProps(
    injectBannerManagerProps,
));
export const connectBannerManager = connect;

export const BannerManager = overridable<IBannerManagerInputProps>(connect(BannerManagerComponent));
