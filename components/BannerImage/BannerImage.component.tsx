import clsx from "clsx";
import {BannerImageProps} from "./BannerImage.d";
import styles from './BannerImage.module.scss';
import { Spin } from "antd";

export const BannerImageComponent = ({banner, isLoading, imgHost, imgFolder}:BannerImageProps) => <Spin spinning={isLoading}>
    <img
        src={banner && imgHost && imgFolder
            ? `${imgHost}/${imgFolder}/${banner.url}`
            : '/logo.png'
        }
        alt={banner?.title}
        className={clsx([styles.bannerImage, isLoading && styles.loading])}
    />
</Spin>;
