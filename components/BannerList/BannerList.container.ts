import { IBanner } from "@common-shared/banner/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { BannerListComponent } from "./BannerList.component";
import { BannerListProps, IBannerListInputProps, IBannerListProps } from "./BannerList.d";

const injectBannerListProps = createInjector(({tag}:IBannerListInputProps):IBannerListProps => {
    const [banners, setBanners] = useState<IBanner[]>([]);

    useEffect(() => {
        services().banner.search({tag}).then(setBanners);
    }, [tag]);
    
    return {banners};
});

const connect = inject<IBannerListInputProps, BannerListProps>(mergeProps(
    injectBannerListProps,
));

export const BannerList = overridable<IBannerListInputProps>(connect(BannerListComponent));
