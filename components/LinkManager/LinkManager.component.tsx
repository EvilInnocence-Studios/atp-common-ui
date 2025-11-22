import { ILink } from "@common-shared/link/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { SortableList } from "@core/components/SortableList";
import { onInputChange } from "@core/lib/onInputChange";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Input, Space, Spin } from "antd";
import { prop } from "ts-functional";
import { LinkListSelect } from "../LinkListSelect";
import { LinkManagerProps } from "./LinkManager.d";
import styles from './LinkManager.module.scss';
import { overridable } from "@core/lib/overridable";

const CanView = hasPermission("links.view");
const CanEdit = hasPermission("links.update");
const CanCreate = hasPermission("links.create");
const CanDelete = hasPermission("links.delete");

const linkId = (link: ILink, index: number) => `${link.id}:${index}`;

interface ILinkItemProps {
    update: (id: string, field: keyof ILink) => (value: string | null) => void;
    remove: (id: string) => () => void;
    classes?: any;
}

export const LinkItem = overridable(({ item: link, update, remove, classes = styles }: { item: ILink } & ILinkItemProps) => {
    return <div className={classes.link}>
        <Editable value={link.text} onChange={update(link.id, "text")} />
        <Editable value={link.url} onChange={update(link.id, "url")} />
        <LinkListSelect
            className={classes.listSelect}
            listId={link.subMenuKey}
            onChange={update(link.id, "subMenuKey")}
        />
        <CanEdit no>{link.text} [{link.url}]</CanEdit>
        <CanDelete yes><DeleteBtn entityType="link" onClick={remove(link.id)} /></CanDelete>
    </div>;
});

export const LinkManagerComponent = overridable(({
    links, isLoading,
    text, setText,
    url, setUrl,
    create, update, remove, sort,
    classes = styles
}: LinkManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            <SortableList<ILink, ILinkItemProps>
                items={links}
                getId={prop("id")}
                getListId={linkId}
                sort={sort}
                ItemComponent={LinkItem}
                itemProps={{ update, remove, classes }}
            />
            <CanCreate yes>
                <Space.Compact style={{ width: "100%" }}>
                    <Input
                        value={text}
                        onChange={onInputChange(setText)}
                        placeholder="Text"
                        className={classes.newLinkForm}
                        onPressEnter={create}
                    />
                    <Input
                        value={url}
                        onChange={onInputChange(setUrl)}
                        placeholder="Url"
                        className={classes.newLinkForm}
                        onPressEnter={create}
                    />
                    <Button onClick={create} variant="link"><FontAwesomeIcon icon={faAdd} /></Button>
                </Space.Compact>
            </CanCreate>
        </CanView>
        <CanView no>
            <Alert type="warning" message="You don't have permission to view links." />
        </CanView>
    </Spin>
);
