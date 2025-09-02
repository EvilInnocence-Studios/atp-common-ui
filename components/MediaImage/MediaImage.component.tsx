import clsx from "clsx";
import {MediaImageProps} from "./MediaImage.d";
import styles from './MediaImage.module.scss';

export const MediaImageComponent = ({image, isLoading, fullUrl}:MediaImageProps) =>
    <img
        src={fullUrl ? fullUrl : '/logo.png'}
        alt={image?.altText}
        className={clsx([styles.mediaImage, isLoading && styles.loading])}
    />;
