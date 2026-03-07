import { Switch } from "antd";
import { IMediaImageInputProps } from "./MediaImage";
import { useMediaImage } from "./MediaImage.container";
import { Label } from "@core/components/Label";
import { Editable } from "@core/components/Editable";
import { MediaPicker } from "../MediaPicker";

export const MediaImagePropEditor = (
    { imageId, linkUrl, isBackgroundImage, imageUrlVarName }: IMediaImageInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <MediaPicker imageId={imageId} onSelect={updateProp("imageId")} />
        <br />
        <Label label="Link URL">
            <Editable value={linkUrl || ""} onChange={updateProp("linkUrl")} />
        </Label>
        <Switch
            checked={isBackgroundImage}
            checkedChildren="Background"
            unCheckedChildren="Inline"
            onChange={updateProp("isBackgroundImage")}
        />
        <Label label="Image URL var name">
            <Editable value={imageUrlVarName || ""} onChange={updateProp("imageUrlVarName")} />
        </Label>
    </>;
}
