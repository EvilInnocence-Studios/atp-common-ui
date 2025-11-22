import clsx from "clsx";
import { MediaImageProps } from "./MediaImage.d";
import styles from './MediaImage.module.scss';
import { overridable } from "@core/lib/overridable";

export const MediaImageComponent = overridable(({ image, isLoading, fullUrl, classes = styles }: MediaImageProps) => fullUrl
    ? <img
        src={fullUrl}
        alt={image?.altText}
        className={clsx([classes.mediaImage, isLoading && classes.loading])}
    />
    : null
);
