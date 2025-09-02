import { IMedia } from "@common-shared/media/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { MediaManagerComponent } from "./MediaManager.component";
import { IMediaManagerInputProps, IMediaManagerProps, MediaManagerProps } from "./MediaManager.d";

const injectMediaManagerProps = createInjector(({}:IMediaManagerInputProps):IMediaManagerProps => {
    const [images, setImages] = useState<IMedia[]>([]);
    const [overwrite, setOverwrite] = useState(false);

    const loader = useLoaderAsync();

    const refresh = () => {
        loader(() => services().media.search({}).then(setImages));
    }

    useEffect(refresh, []);
    
    const upload = (file: File) => {
        loader(() => services().media.create(file, overwrite).then(refresh));
    }

    return {images, isLoading: loader.isLoading, upload, overwrite, setOverwrite, refresh};
});

const connect = inject<IMediaManagerInputProps, MediaManagerProps>(mergeProps(
    injectMediaManagerProps,
));

export const MediaManager = connect(MediaManagerComponent);
