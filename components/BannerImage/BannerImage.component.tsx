import clsx from "clsx";
import { BannerImageProps } from "./BannerImage.d";
import styles from './BannerImage.module.scss';
import { Spin } from "antd";
import { overridable } from "@core/lib/overridable";

export const BannerImageComponent = overridable(({ banner, isLoading, imgHost, imgFolder, classes = styles }: BannerImageProps) => <Spin spinning={isLoading}>
    <img
        src={banner && imgHost && imgFolder
            ? `${imgHost}/${imgFolder}/${banner.url}`
            : '/logo.png'
        }
        alt={banner?.title}
        className={clsx([classes.bannerImage, isLoading && classes.loading])}
    />
</Spin>);
