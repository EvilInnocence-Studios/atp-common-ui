import { Label } from "@core/components/Label";
import { IPatreonInputProps } from "./Patreon.d";
import { Editable } from "@core/components/Editable";

export const PatreonPropEditor = (
    {handle}: IPatreonInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Patreon" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
