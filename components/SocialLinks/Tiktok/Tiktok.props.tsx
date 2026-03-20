import { Label } from "@core/components/Label";
import { ITiktokInputProps } from "./Tiktok.d";
import { Editable } from "@core/components/Editable";

export const TiktokPropEditor = (
    {handle}: ITiktokInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="TikTok @" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
