import { IMedia } from "@common-shared/media/types";
import { useSetting } from "@common/lib/setting/services";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { MediaImageComponent } from "./MediaImage.component";
import { IMediaImageInputProps, IMediaImageProps, MediaImageProps } from "./MediaImage.d";

export const useFullImageUrl = (folderSetting: string, fileName:string) => {
    const imgHost = useSetting("imageHost");
    const imgFolder = useSetting(folderSetting);
    return !!imgHost && !!imgFolder
        ? `${imgHost}/${imgFolder}/${encodeURIComponent(fileName)}`
        : "";
}

const injectMediaImageProps = createInjector(({imageId, settingKey}:IMediaImageInputProps):IMediaImageProps => {
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
});

const connect = inject<IMediaImageInputProps, MediaImageProps>(mergeProps(
    injectMediaImageProps,
));

export const MediaImage = overridable<IMediaImageInputProps>(connect(MediaImageComponent));
