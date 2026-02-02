import { IMedia } from "@common-shared/media/types";
import { useSetting } from "@common/lib/setting/services";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { MediaImageComponent } from "./MediaImage.component";
import { IMediaImageInputProps, IMediaImageProps, MediaImageProps } from "./MediaImage.d";
import { MediaImageLayoutEditor } from "./MediaImage.layout";
import { MediaImagePropEditor } from "./MediaImage.props";
import { ILayoutComponent, ILayoutComponentSerialized } from "@theming/lib/layout/layout";

export const useFullImageUrl = (folderSetting: string, fileName:string) => {
    const imgHost = useSetting("imageHost");
    const imgFolder = useSetting(folderSetting);
    return !!imgHost && !!imgFolder
        ? `${imgHost}/${imgFolder}/${encodeURIComponent(fileName)}`
        : "";
}

export const getFullImageUrl = async (folderSetting: string, fileName:string) => {
    const imgHost = await services().setting.get("imageHost");
    const imgFolder = await services().setting.get(folderSetting);
    return !!imgHost && !!imgFolder
        ? `${imgHost}/${imgFolder}/${encodeURIComponent(fileName)}`
        : "";
}

export const useMediaImage = ({imageId, settingKey}:IMediaImageInputProps) => {
    const [image, setImage] = useState<IMedia | null>(null);
    const fullUrl = useFullImageUrl("mediaImageFolder", image?.url || "");
    const loader = useLoaderAsync();
    const settingValue = useSetting(settingKey || null);

    useEffect(() => {
        const id = imageId || settingValue;
        if(id) {
            loader(async () =>
                services().media.get(id)
                    .then(setImage)
            );
        }
    }, [imageId, settingValue]);

    return {image, isLoading: loader.isLoading, fullUrl};
}

const injectMediaImageProps = createInjector(({imageId, settingKey}:IMediaImageInputProps):IMediaImageProps => useMediaImage({imageId, settingKey}));

const connect = inject<IMediaImageInputProps, MediaImageProps>(mergeProps(
    injectMediaImageProps,
));
export const connectMediaImage = connect;

export const MediaImage = withLayoutMetadata(
    overridable<IMediaImageInputProps>(connect(MediaImageComponent)),
    {
        name: "Image",
        category: "Basic",
        displayName: "Image",
        icon,
        description: "An image",
        layoutEditor: MediaImageLayoutEditor,
        propEditor: MediaImagePropEditor,
        serialize: async (cmp:ILayoutComponent, context: { addFile: (name: string, blob: Blob) => void }): Promise<ILayoutComponentSerialized<{img:IMedia, data: string}>> => {
            // Load the image and serialize it to  __data along with the image file itself
            const img = await services().media.get(cmp.props?.imageId || "");
            const fullUrl = await getFullImageUrl("mediaImageFolder", img.url || "");
            const blob = await fetch(fullUrl, { mode: 'cors', cache: 'no-cache' }).then(res => res.blob());
            
            if (context && context.addFile) {
                context.addFile(img.url, blob);
            }

            return {
                ...cmp,
                __data: {
                    img, 
                    data: img.url // Store filename instead of base64
                }
            };
        },
        deserialize: async ({__data, ...cmp}:ILayoutComponentSerialized<{img:IMedia, data: string}>, context: { getFile: (name: string) => Promise<Blob | null> }) => {
            if (!__data) return Promise.resolve(cmp);

            const {img, data} = __data;
            const fileName = data; // 'data' now holds the filename

            // Get blob from context
            let blob: Blob | null = null;
            if (context && context.getFile) {
                blob = await context.getFile(fileName);
            }

            if (!blob) {
                // Fallback or error if image not found in zip
                 console.warn(`Image ${fileName} not found in theme package`);
                 return Promise.resolve(cmp);
            }

            const file = new File([blob], img.url);

            // Create image from file
            const newImg:Partial<IMedia> = await services().media.create(file, true);
            const imageId = newImg.id as string;
            newImg.id = undefined;

            // Update the image with the original metadata
            img.id = imageId;
            await services().media.update(imageId, img);
            
            return Promise.resolve({
                ...cmp,
                props: {
                    ...cmp.props,
                    imageId
                }
            });
        }
    }
);
