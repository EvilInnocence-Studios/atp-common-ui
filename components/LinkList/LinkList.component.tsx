import { Spin } from "antd";
import { Link } from "react-router";
import { LinkListProps } from "./LinkList.d";
import { prop, sort } from "ts-functional";
import { ILink } from "@common-shared/link/types";

export const LinkListComponent = ({links, isLoading, className}:LinkListProps) =>
    <Spin spinning={isLoading}>
        <ul className={`linkList ${className}`}>
            {links.sort(sort.by(prop<ILink, "order">("order")).asc).map(link => <li key={link.id} className="linkItem">
                <Link to={link.url}>
                    {link.text}
                </Link>
            </li>)}
        </ul>
    </Spin>;
