import { ILink } from "@common-shared/link/types";
import { Spin } from "antd";
import clsx from "clsx";
import { Link } from "react-router";
import { prop, sort } from "ts-functional";
import { LinkList } from "./LinkList.container";
import { LinkListProps } from "./LinkList.d";
import styles from "./LinkList.module.scss";

export const LinkListComponent = ({links, isLoading, className}:LinkListProps) =>
    <Spin spinning={isLoading}>
        <ul className={clsx([`linkList`, className])}>
            {links.sort(sort.by(prop<ILink, "order">("order")).asc).map(link => <li key={link.id} className={clsx([styles.linkItem, "linkItem"])}>
                <Link to={link.url}>
                    {link.text}
                </Link>
                {link.subMenuKey && <LinkList id={link.subMenuKey} className={styles.subMenu} />}
            </li>)}
        </ul>
    </Spin>;
