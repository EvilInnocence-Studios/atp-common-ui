import { Label } from "@core/components/Label";
import { IInstagramInputProps } from "./Instagram.d";
import { Editable } from "@core/components/Editable";

export const InstagramPropEditor = (
    {handle}: IInstagramInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Instagram" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
