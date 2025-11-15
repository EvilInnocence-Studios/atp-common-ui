import { Select } from "antd";
import { LinkListSelectProps } from "./LinkListSelect.d";
import { overridable } from "@core/lib/overridable";

export const LinkListSelectComponent = overridable(({listId, onChange, lists, className}:LinkListSelectProps) =>
    <Select
        className={className}
        options={[
            {value: null, label: ""},
            ...lists
        ]}
        onChange={onChange}
        value={listId}
    />
);
