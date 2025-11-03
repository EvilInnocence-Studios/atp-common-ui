import { IMedia } from "@common-shared/media/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { MediaManagerComponent } from "./MediaManager.component";
import { IMediaManagerInputProps, IMediaManagerProps, MediaManagerProps } from "./MediaManager.d";

const injectMediaManagerProps = createInjector(({}:IMediaManagerInputProps):IMediaManagerProps => {
    const [images, setImages] = useState<IMedia[]>([]);
    const [overwrite, setOverwrite] = useState(false);
    const [query, setQuery] = useState('');

    const loader = useLoaderAsync();

    const refresh = () => {
        loader(() => services().media.search({}).then(setImages));
    }

    useEffect(refresh, []);
    
    const upload = (file: File) => {
        loader(() => services().media.create(file, overwrite).then(refresh));
    }

    const filterColumns = ['url', 'altText', 'title', 'caption'];
    const filteredImages = images.filter(i => filterColumns.some(c => i[c as keyof IMedia]?.toLowerCase().includes(query.toLowerCase())));

    return {
        images: filteredImages,
        isLoading: loader.isLoading,
        upload,
        overwrite, setOverwrite,
        query, setQuery,
        refresh,
    };
});

const connect = inject<IMediaManagerInputProps, MediaManagerProps>(mergeProps(
    injectMediaManagerProps,
));

export const MediaManager = overridable<IMediaManagerInputProps>(connect(MediaManagerComponent));
