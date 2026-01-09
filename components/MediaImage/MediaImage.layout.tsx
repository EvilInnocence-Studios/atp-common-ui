import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { leafLayoutComponent } from "@theming/lib/layout/componentRegistry";
import { ILayoutComponentProps } from "@theming/lib/layout/layout";
import { useState } from "react";
import { IMediaImageInputProps } from "./MediaImage";
import { MediaImageComponent } from "./MediaImage.component";
import { connectMediaImage } from "./MediaImage.container";
import { MediaUploadOverlay } from "./MediaUploadOverlay";

export const MediaImageLayoutEditor = leafLayoutComponent<IMediaImageInputProps & ILayoutComponentProps>(
    ({__layoutId, __update, __isSelected, ...props}) => {
        const loader = useLoaderAsync();
        const [node, setNode] = useState<HTMLElement | null>(null);

        const MediaImageOrig = connectMediaImage(MediaImageComponent);

        const upload = !!props.imageId
            ? (file: File) => {
                loader(() => services().media.replace(props.imageId || "", file)
                    .then(() => flash.success("Image replaced"))
                );
            }
            : (file: File) => {
                loader(() => services().media.create(file, true)
                    .then((newImage) => {
                        __update("imageId")(newImage.id)
                    })
                    .then(flash.success("Image uploaded"))
                );
            }

        return (
            <>
                {props.imageId ? (
                    <MediaImageOrig {...props} />
                ) : (
                    <div 
                        ref={setNode} 
                        style={{ 
                             minHeight: '100px', 
                             width: '100%', 
                             background: 'rgba(0,0,0,0.05)', 
                             display: 'flex', 
                             alignItems: 'center', 
                             justifyContent: 'center',
                             border: '1px dashed #ccc',
                             color: '#999'
                        }}
                    >
                         <span>Upload Image</span>
                    </div>
                )}
                
                {__isSelected && (
                    <MediaUploadOverlay 
                        targetNode={node}
                        onUpload={upload}
                        hasImage={!!props.imageId}
                    />
                )}
            </>
        );
    }
);
