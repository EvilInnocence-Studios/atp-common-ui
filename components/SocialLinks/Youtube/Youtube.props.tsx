import { Label } from "@core/components/Label";
import { IYoutubeInputProps } from "./Youtube.d";
import { Editable } from "@core/components/Editable";

export const YoutubePropEditor = (
    {handle}: IYoutubeInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="YouTube @" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
