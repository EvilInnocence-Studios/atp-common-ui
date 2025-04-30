import clsx from "clsx";
import {BannerImageProps} from "./BannerImage.d";
import styles from './BannerImage.module.scss';
import { Spin } from "antd";

export const imgHost = `https://evilinnocence.s3.us-east-1.amazonaws.com/media/banner/`;

export const BannerImageComponent = ({banner, isLoading, imgHost}:BannerImageProps) => <Spin spinning={isLoading}>
    <img
        src={banner && imgHost
            ? `${imgHost}${banner.url}`
            : '/logo.png'
        }
        alt={banner?.title}
        className={clsx([styles.bannerImage, isLoading && styles.loading])}
    />
</Spin>;
