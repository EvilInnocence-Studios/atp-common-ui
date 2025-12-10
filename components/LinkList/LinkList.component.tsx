import { ILink } from "@common-shared/link/types";
import { Spin } from "antd";
import clsx from "clsx";
import { Link } from "react-router";
import { prop, sort } from "ts-functional";
import { LinkList } from "./LinkList.container";
import { LinkListProps } from "./LinkList.d";
import styles from "./LinkList.module.scss";
import { overridable } from "@core/lib/overridable";

export const LinkListComponent = overridable(({ links, isLoading, className, classes = styles, css }: LinkListProps) =>
    <Spin spinning={isLoading}>
        {css && <style>{css}</style>}
        <ul className={clsx([`linkList`, className])}>
            {links.sort(sort.by(prop<ILink, "order">("order")).asc).map(link =>
                <li key={link.id} className={clsx([classes.linkItem, "linkItem"])}>
                    <Link to={link.url}>
                        {link.text}
                    </Link>
                    {link.subMenuKey && <LinkList id={link.subMenuKey} className={clsx([classes.subMenu, "subMenu"])} />}
                </li>
            )}
        </ul>
    </Spin>
);
