import { faGear, faImage, faPencil, faRightLeft, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Index } from "ts-functional/dist/types";

export const commonMenus:Index<ItemType<MenuItemType>[]> = {
    admin: [{
        key: "common",
        label: "Common",
        icon: <FontAwesomeIcon icon={faGear} />,
        children: [{
            key: "tags",
            label: "Tags",
            icon: <FontAwesomeIcon icon={faTag} />,
        }, {
            key: "synonyms",
            label: "Synonyms",
            icon: <FontAwesomeIcon icon={faRightLeft} />
        }]
    }, {
        key: "Content",
        label: "Content",
        icon: <FontAwesomeIcon icon={faPencil} />,
        children: [{
            key: "banners",
            label: "Banners",
            icon: <FontAwesomeIcon icon={faImage} />,
        }]
    }],
};
