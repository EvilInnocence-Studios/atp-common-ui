import { Switch } from "antd";
import { IMediaImageInputProps } from "./MediaImage";
import { useMediaImage } from "./MediaImage.container";
import { Label } from "@core/components/Label";
import { Editable } from "@core/components/Editable";

export const MediaImagePropEditor = (
    {imageId, linkUrl, settingKey, isBackgroundImage, imageUrlVarName}: IMediaImageInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    const {image, fullUrl} = useMediaImage({imageId, settingKey});
   
    return <>
        <img
            src={fullUrl}
            alt={image?.altText}
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
                margin: "auto",
            }}
        />
        <br/>
        <Label label="Link URL">
            <Editable value={linkUrl || ""} onChange={updateProp("linkUrl")}/>
        </Label>
        <Switch
            checked={isBackgroundImage}
            checkedChildren="Background"
            unCheckedChildren="Inline"
            onChange={updateProp("isBackgroundImage")}
        />
        <Label label="Image URL var name">
            <Editable value={imageUrlVarName || ""} onChange={updateProp("imageUrlVarName")}/>
        </Label>
    </>;
}
