import clsx from "clsx";
import { MediaImageProps } from "./MediaImage.d";
import styles from './MediaImage.module.scss';
import { overridable } from "@core/lib/overridable";

export const MediaImageComponent = overridable(({
    css, className, image, linkUrl, isLoading, fullUrl, classes = styles,
    isBackgroundImage,
    imageUrlVarName,
}: MediaImageProps) => fullUrl
    ? <>
        {!!css && <style>{css}</style>}
        {!isBackgroundImage && <img
            src={fullUrl}
            alt={image?.altText}
            crossOrigin="anonymous"
            className={clsx([className, classes.mediaImage, isLoading && classes.loading])}
            onClick={() => {
                if (linkUrl) {
                    window.open(linkUrl, '_blank');
                }
            }}
            style={{ cursor: linkUrl ? 'pointer' : 'auto' }}
        />}
        {isBackgroundImage && <style>
            :root {"{"}
                {imageUrlVarName && `--${imageUrlVarName}:url("${fullUrl}");`}
            {"}"}
        </style>}            
    </>
    : null
);
