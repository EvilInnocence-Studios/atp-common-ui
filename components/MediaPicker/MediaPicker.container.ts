import { createInjector, inject, mergeProps } from "unstateless";
import { MediaPickerComponent } from "./MediaPicker.component";
import { IMediaPickerInputProps, MediaPickerProps, IMediaPickerProps } from "./MediaPicker.d";
import { overridable } from "@core/lib/overridable";
import { useEffect, useState } from "react";
import { IMedia } from "@common-shared/media/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";

const injectMediaPickerProps = createInjector(({ onSelect }: IMediaPickerInputProps): IMediaPickerProps => {
    const [images, setImages] = useState<IMedia[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [query, setQuery] = useState('');

    const loader = useLoaderAsync();

    const refreshImages = () => {
        loader(() => services().media.search({}).then(setImages));
    }

    useEffect(() => {
        if (isModalVisible) {
            refreshImages();
        }
    }, [isModalVisible]);

    const upload = (file: File) => {
        loader(() => services().media.create(file, false).then((newImage) => {
            onSelect(newImage.id);
        }));
    }

    const filterColumns = ['url', 'altText', 'title', 'caption'];
    const filteredImages = images.filter(i => filterColumns.some(c => i[c as keyof IMedia]?.toLowerCase().includes(query.toLowerCase())));

    return {
        isModalVisible,
        setIsModalVisible,
        images: filteredImages,
        query,
        setQuery,
        upload,
        isLoading: loader.isLoading,
    };
});

const connect = inject<IMediaPickerInputProps, MediaPickerProps>(mergeProps(
    injectMediaPickerProps,
));
export const connectMediaPicker = connect;

export const MediaPicker = overridable<IMediaPickerInputProps>(connect(MediaPickerComponent));
