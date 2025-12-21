import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Upload } from "antd";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MediaUploadOverlayProps {
    targetNode: HTMLElement | null;
    onUpload: (file: File) => void;
    hasImage: boolean;
    zIndex?: number;
}

export const MediaUploadOverlay = ({
    targetNode,
    onUpload,
    hasImage,
    zIndex = 105 // Slightly higher than selection overlay
}: MediaUploadOverlayProps) => {
    const [rect, setRect] = useState<DOMRect | null>(null);

    useLayoutEffect(() => {
        if (!targetNode) return;

        const updateRect = () => {
            const container = document.getElementById('layout-editor-canvas');
            if (container && targetNode) {
                const containerRect = container.getBoundingClientRect();
                const nodeRect = targetNode.getBoundingClientRect();

                setRect({
                    top: nodeRect.top - containerRect.top,
                    left: nodeRect.left - containerRect.left,
                    width: nodeRect.width,
                    height: nodeRect.height,
                    bottom: 0,
                    right: 0,
                    x: nodeRect.left - containerRect.left,
                    y: nodeRect.top - containerRect.top,
                    toJSON: () => {}
                });
            }
        };

        updateRect();

        const resizeObserver = new ResizeObserver(updateRect);
        resizeObserver.observe(targetNode);

        const container = document.getElementById('layout-editor-canvas');
        if (container) resizeObserver.observe(container);

        window.addEventListener('scroll', updateRect, true);
        window.addEventListener('resize', updateRect);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', updateRect, true);
            window.removeEventListener('resize', updateRect);
        };
    }, [targetNode]);

    if (!targetNode || !rect) return null;

    const portalContainer = document.getElementById('layout-editor-canvas');
    if (!portalContainer) return null;

    return createPortal(
        <div
            style={{
                position: 'absolute',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                zIndex: zIndex,
                pointerEvents: 'auto', // Must receive drop events
                // Transparent background unless dragging over? 
                // Upload.Dragger handles visual feedback usually.
            }}
        >
             <Upload.Dragger 
                style={{
                    padding: 0, 
                    border: 'none', 
                    background: 'transparent',
                    height: '100%',
                    width: '100%'
                }}
                customRequest={({ file }) => onUpload(file as File)} 
                showUploadList={false}
                openFileDialogOnClick={true} // Allow clicking to upload too
            >
                {/* Visual feedback only if no image, or always? 
                    If image exists, we want to see the image clearly. 
                    Maybe show an icon on hover? 
                    Upload.Dragger usually renders children.
                    We don't want to occlude the image.
                */}
                {!hasImage && (
                    <div style={{ color: '#1890ff', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                         <FontAwesomeIcon icon={faUpload} /> 
                         <span>Upload image</span>
                    </div>
                )}
                {/* If has image, render nothing visible, but Dragger logic remains active */}
            </Upload.Dragger>
        </div>,
        portalContainer
    );
};
