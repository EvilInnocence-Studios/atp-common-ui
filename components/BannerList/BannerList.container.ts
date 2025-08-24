import { IBanner } from "@common-shared/banner/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { BannerListComponent } from "./BannerList.component";
import { BannerListProps, IBannerListInputProps, IBannerListProps } from "./BannerList.d";

const injectBannerListProps = createInjector(({tag}:IBannerListInputProps):IBannerListProps => {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(() => services().banner.search({tag}).then(setBanners));
    }, [tag]);
    
    return {banners, isLoading: loader.isLoading};
});

const connect = inject<IBannerListInputProps, BannerListProps>(mergeProps(
    injectBannerListProps,
));

export const BannerList = connect(BannerListComponent);
