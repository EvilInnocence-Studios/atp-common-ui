import { IMedia } from "@common-shared/media/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useUpdater } from "@core/lib/useUpdater";
import { createInjector, inject, mergeProps } from "unstateless";
import { MediaEditorComponent } from "./MediaEditor.component";
import { IMediaEditorInputProps, IMediaEditorProps, MediaEditorProps } from "./MediaEditor.d";

const injectMediaEditorProps = createInjector(({imageId, onDelete}:IMediaEditorInputProps):IMediaEditorProps => {
    const loader = useLoaderAsync();

    const updater = useUpdater<IMedia>(
        "media",
        imageId,
        {} as IMedia,
        services().media.get,
        services().media.update,
        "manual"
    );

    const remove = () => {
        services().media.remove(imageId).then(() => {
            flash.success("Image removed");
            onDelete();
        });
    }

    const upload = (file: File) => {
        loader(() => services().media.replace(updater.history.entity.id, file)
            .then(updater.refresh)
            .then(flash.success("Image replaced"))
        );
    }
    
    return {
        image: updater.history.entity,
        ...updater,
        isLoading: updater.isLoading || loader.isLoading,
        remove,
        upload,
    };
});

const connect = inject<IMediaEditorInputProps, MediaEditorProps>(mergeProps(
    injectMediaEditorProps,
));

export const MediaEditor = connect(MediaEditorComponent);
