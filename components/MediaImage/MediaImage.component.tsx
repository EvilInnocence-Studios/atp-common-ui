import clsx from "clsx";
import { MediaImageProps } from "./MediaImage.d";
import styles from './MediaImage.module.scss';
import { overridable } from "@core/lib/overridable";

export const MediaImageComponent = overridable(({css, className, image, isLoading, fullUrl, classes = styles }: MediaImageProps) => fullUrl
    ? <>
        {!!css && <style>{css}</style>}
        <img
            src={fullUrl}
            alt={image?.altText}
            className={clsx([className, classes.mediaImage, isLoading && classes.loading])}
        />
    </>
    : null
);
