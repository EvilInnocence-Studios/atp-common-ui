import { Label } from "@core/components/Label";
import { IBlueskyFeedInputProps } from "./BlueskyFeed";
import { Editable } from "@core/components/Editable/Editable.container";

export const BlueskyFeedPropEditor = (
    {pageSize}:IBlueskyFeedInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => <Label label="Page Size">
    <Editable value={pageSize?.toString() || ""} onChange={(pageSize) => updateProp("pageSize")(pageSize)}/>
</Label>;
