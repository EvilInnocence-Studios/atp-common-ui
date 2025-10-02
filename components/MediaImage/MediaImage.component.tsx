import clsx from "clsx";
import { MediaImageProps } from "./MediaImage.d";
import styles from './MediaImage.module.scss';

export const MediaImageComponent = ({image, isLoading, fullUrl}:MediaImageProps) => fullUrl
    ? <img
        src={fullUrl}
        alt={image?.altText}
        className={clsx([styles.mediaImage, isLoading && styles.loading])}
    />
    : null;
