import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Index } from "ts-functional/dist/types";

export const commonMenus:Index<ItemType<MenuItemType>[]> = {
    admin: [{
        key: "tags",
        label: "Tags",
        icon: <FontAwesomeIcon icon={faTag} />,
    }],
};
