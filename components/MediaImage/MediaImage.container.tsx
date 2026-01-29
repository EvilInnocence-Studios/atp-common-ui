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
        serialize: async (cmp:ILayoutComponent): Promise<ILayoutComponentSerialized<{img:IMedia, data: string}>> => {
            // Load the image and serialize it to  __data along with the image file itself
            const img = await services().media.get(cmp.props?.imageId || "");
            const fullUrl = await getFullImageUrl("mediaImageFolder", img.url || "");
            const blob = await fetch(fullUrl, { mode: 'cors', cache: 'no-cache' }).then(res => res.blob());
            
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve({
                    ...cmp,
                    __data: {
                        img, 
                        data: reader.result as string
                    }
                });
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        },
        deserialize: async (cmp:ILayoutComponentSerialized<{img:IMedia, data: string}>) => {
            if (!cmp.__data) return Promise.resolve(cmp);

            const {img, data} = cmp.__data;

            // Create File object from data
            const res = await fetch(data);
            const blob = await (await res.blob()).arrayBuffer();
            const file = new File([blob], img.url);

            // Create image from file
            const newImg = await services().media.create(file, true);

            // Update the image with the original metadata
            img.id = newImg.id;
            const updatedImage = await services().media.update(img.id, img);
            
            return Promise.resolve({
                ...cmp,
                props: {
                    ...cmp.props,
                    imageId: updatedImage.id
                }
            });
        }
    }
);
