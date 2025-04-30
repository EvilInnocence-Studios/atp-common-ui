import { IBanner } from "@common-shared/banner/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { BannerImageComponent } from "./BannerImage.component";
import { BannerImageProps, IBannerImageInputProps, IBannerImageProps } from "./BannerImage.d";
import { useSetting } from "@common/lib/setting/services";

const injectBannerImageProps = createInjector(({bannerId}:IBannerImageInputProps):IBannerImageProps => {
    const [banner, setBanner] = useState<IBanner | null>(null);
    const imgHost = useSetting("imageHost");
    const imgFolder = useSetting("bannerImageFolder");
    const loader = useLoaderAsync();

    useEffect(() => {
        if(bannerId) {
            loader(async () =>
                services().banner.get(bannerId)
                    .then(setBanner)
            );
        }
    }, [bannerId]);

    return {banner, isLoading: loader.isLoading, imgHost, imgFolder};
});

const connect = inject<IBannerImageInputProps, BannerImageProps>(mergeProps(
    injectBannerImageProps,
));

export const BannerImage = connect(BannerImageComponent);
