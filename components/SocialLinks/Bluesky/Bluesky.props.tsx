import { Label } from "@core/components/Label";
import { IBlueskyInputProps } from "./Bluesky.d";
import { Editable } from "@core/components/Editable";

export const BlueskyPropEditor = (
    {handle}: IBlueskyInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Bluesky" >
            <Editable
                value={handle || ""}
                onChange={updateProp("handle")}
                placeholder="Handle"
            />
        </Label>
    );
}
