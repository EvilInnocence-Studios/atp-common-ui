import clsx from "clsx";
import { MediaImageProps } from "./MediaImage.d";
import styles from './MediaImage.module.scss';
import { overridable } from "@core/lib/overridable";
import { useNavigate } from "react-router";

export const MediaImageComponent = overridable(({
    css, className, image, linkUrl, isLoading, fullUrl, classes = styles,
    isBackgroundImage,
    imageUrlVarName,
}: MediaImageProps) => {
    if (!fullUrl) return null;

    const isFont = /\.(woff|woff2|ttf|otf|eot)(\?.*)?$/i.test(fullUrl);
    const fontName = `FontPreview_${image?.id || Math.random().toString(36).substring(7)}`;

    const navigate = useNavigate();

    return (
        <>
            {!!css && <style>{css}</style>}
            {isFont && <style>
                {`@font-face {
                    font-family: "${fontName}";
                    src: url("${fullUrl}");
                }`}
            </style>}
            {!isBackgroundImage && !isFont && <img
                src={fullUrl}
                alt={image?.altText}
                className={clsx([className, classes.mediaImage, isLoading && classes.loading])}
                onClick={() => {
                    if (linkUrl) {
                        navigate(linkUrl);
                    }
                }}
                style={{ cursor: linkUrl ? 'pointer' : 'auto' }}
            />}
            {!isBackgroundImage && isFont && <div
                className={clsx([className, classes.fontContainer, isLoading && classes.loading])}
                onClick={() => {
                    if (linkUrl) {
                        window.open(linkUrl, '_blank');
                    }
                }}
                style={{ cursor: linkUrl ? 'pointer' : 'auto' }}
            >
                <div className={classes.fontSample} style={{ fontFamily: `"${fontName}"` }}>
                    AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!@#$%^&*()_+-=[]{"{}"};':",./{"<>"}?
                </div>
            </div>}
            {isBackgroundImage && <style>
                :root {"{"}
                {imageUrlVarName && `--${imageUrlVarName}:url("${fullUrl}");`}
                {"}"}
            </style>}
        </>
    );
});
