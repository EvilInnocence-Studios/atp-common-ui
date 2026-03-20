import { Label } from "@core/components/Label";
import { IKofiInputProps } from "./Kofi.d";
import { Editable } from "@core/components/Editable";

export const KofiPropEditor = (
    {handle}: IKofiInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Ko-fi" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
