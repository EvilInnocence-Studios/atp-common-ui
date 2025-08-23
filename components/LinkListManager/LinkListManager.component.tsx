import { ILinkList } from "@common-shared/link/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onInputChange } from "@core/lib/onInputChange";
import { faAdd, faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Card, Col, Input, Row, Space, Spin } from "antd";
import { ClearCacheButton } from "../ClearCacheButton";
import { LinkManager } from "../LinkManager";
import { LinkListManagerProps } from "./LinkListManager.d";
import styles from './LinkListManager.module.scss';
import clsx from "clsx";

const CanView = hasPermission("links.view");
const CanEdit = hasPermission("links.update");
const CanDelete = hasPermission("links.delete");
const CanCreate = hasPermission("links.create");

export const LinkListManagerComponent = ({
    lists, isLoading,
    name, setName, listKey, setListKey,
    create, update, remove,
    selectedList, setSelectedList,
}:LinkListManagerProps) =>
    <Spin spinning={isLoading}>
        <Space.Compact className={styles.cacheBtns}>
            <ClearCacheButton entity="link lists" cacheType="linkList" />
            <ClearCacheButton entity="links" cacheType="link" />
        </Space.Compact>
        <h1><FontAwesomeIcon icon={faLink} /> Link Lists</h1>

        <Row gutter={8}>
            <Col xs={6}>
                <ul className={styles.linkList}>
                    {lists.map(list => <li className={clsx([styles.linkListItem, selectedList === list.id && styles.selected])} key={list.id}>
                        <CanEdit yes><Editable value={list.name} onChange={update(list.id, "name")} /></CanEdit>
                        <CanEdit yes><Editable value={list.key} onChange={update(list.id, "key")} /></CanEdit>
                        <CanEdit no>{list.name}</CanEdit>
                        <div className={styles.btns}>
                            <Button type="link" onClick={() => setSelectedList(list.id)}>links <FontAwesomeIcon icon={faArrowRight} /></Button>
                            <CanDelete yes><DeleteBtn entityType="link list" onClick={remove(list.id)} /></CanDelete>
                        </div>
                    </li>)}
                </ul>
                <CanCreate yes>
                    <Card size="small"
                        className={styles.newLinkListForm}
                        title={<>New Link List</>}
                        extra={<Button onClick={create} size="small" variant="link"><FontAwesomeIcon icon={faAdd} /> Create</Button>}
                    >
                        <Input value={name} onChange={onInputChange(setName)} placeholder="Name" />
                        <Input value={listKey} onChange={onInputChange(setListKey)} placeholder="Key" />
                    </Card>
                </CanCreate>
            </Col>
            <Col xs={12}>
                <CanView yes>
                    {lists.find(g => g.id === selectedList) &&
                        <LinkManager list={lists.find(l => l.id === selectedList) as ILinkList} />
                    }
                </CanView>
                <CanView no>
                    <Alert type="warning" message="You don't have permission to view links." />
                </CanView>
            </Col>
        </Row>
    </Spin>;
