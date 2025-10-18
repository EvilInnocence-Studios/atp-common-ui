import { Select } from "antd";
import { LinkListSelectProps } from "./LinkListSelect.d";

export const LinkListSelectComponent = ({listId, onChange, lists, className}:LinkListSelectProps) =>
    <Select
        className={className}
        options={[
            {value: null, label: ""},
            ...lists
        ]}
        onChange={onChange}
        value={listId}
    />;
