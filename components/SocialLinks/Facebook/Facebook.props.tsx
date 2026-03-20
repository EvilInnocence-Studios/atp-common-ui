import { Label } from "@core/components/Label";
import { IFacebookInputProps } from "./Facebook.d";
import { Editable } from "@core/components/Editable";

export const FacebookPropEditor = (
    {handle}: IFacebookInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Facebook" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
