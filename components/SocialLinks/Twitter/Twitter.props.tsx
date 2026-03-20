import { Label } from "@core/components/Label";
import { ITwitterInputProps } from "./Twitter.d";
import { Editable } from "@core/components/Editable";

export const TwitterPropEditor = (
    {handle}: ITwitterInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Twitter" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
