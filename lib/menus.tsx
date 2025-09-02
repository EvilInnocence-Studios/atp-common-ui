import { faGear, faImage, faLink, faParagraph, faPencil, faRightLeft, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Index } from "ts-functional/dist/types";

export const commonMenus:Index<ItemType<MenuItemType>[]> = {
    admin: [{
        key: "common",
        label: "Common",
        icon: <FontAwesomeIcon icon={faGear} />,
        children: [{
            key: "settings",
            label: "Settings",
            icon: <FontAwesomeIcon icon={faGear} />,
        }, {
            key: "tags",
            label: "Tags",
            icon: <FontAwesomeIcon icon={faTag} />,
        }, {
            key: "synonyms",
            label: "Synonyms",
            icon: <FontAwesomeIcon icon={faRightLeft} />
        },{
            key: "links",
            label: "Links",
            icon: <FontAwesomeIcon icon={faLink} />
        }]
    }, {
        key: "Content",
        label: "Content",
        icon: <FontAwesomeIcon icon={faPencil} />,
        children: [{
            key: "pages",
            label: "Pages",
            icon: <FontAwesomeIcon icon={faParagraph} />,
        },{
            key: "snippets",
            label: "Snippets",
            icon: <FontAwesomeIcon icon={faPencil} />,
        },{
            key: "banners",
            label: "Banners",
            icon: <FontAwesomeIcon icon={faImage} />,
        },{
            key: "media",
            label: "Media",
            icon: <FontAwesomeIcon icon={faImage} />
        }]
    }],
};
