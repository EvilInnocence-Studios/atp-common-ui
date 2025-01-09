import { createInjector, inject, mergeProps } from "unstateless";
import {BannerImageComponent} from "./BannerImage.component";
import {IBannerImageInputProps, BannerImageProps, IBannerImageProps} from "./BannerImage.d";
import { useEffect, useState } from "react";
import { IBanner } from "@common-shared/banner/types";
import { useLoader } from "@core/lib/useLoader";
import { services } from "@core/lib/api";

const injectBannerImageProps = createInjector(({bannerId}:IBannerImageInputProps):IBannerImageProps => {
    const [banner, setBanner] = useState<IBanner | null>(null);
    const loader = useLoader();

    useEffect(() => {
        if(bannerId) {
            loader.start();
            services().banner.get(bannerId)
                .then(setBanner)
                .finally(loader.stop);
        }
    }, [bannerId]);

    return {banner, isLoading: loader.isLoading};
});

const connect = inject<IBannerImageInputProps, BannerImageProps>(mergeProps(
    injectBannerImageProps,
));

export const BannerImage = connect(BannerImageComponent);
