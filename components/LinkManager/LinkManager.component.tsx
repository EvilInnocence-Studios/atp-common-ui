import { ILink } from "@common-shared/link/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onInputChange } from "@core/lib/onInputChange";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { faAdd, faForwardStep, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Input, Space, Spin } from "antd";
import { LinkManagerProps } from "./LinkManager.d";
import styles from './LinkManager.module.scss';
import { LinkListSelect } from "../LinkListSelect";

const CanView = hasPermission("links.view");
const CanEdit = hasPermission("links.update");
const CanCreate = hasPermission("links.create");
const CanDelete = hasPermission("links.delete");

const linkId = (link:ILink,  index:number) => `${link.id}:${index}`;

const LinkItem = ({link, update, remove, index, moveToTop}:any) => {
    const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({
        id: linkId(link, index),
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      } : undefined;

    return <div className={styles.link} key={link.id} style={style} ref={setNodeRef} {...attributes}>
        <CanEdit yes>
            <span className={styles.icon} ref={setActivatorNodeRef} {...listeners}>
                <FontAwesomeIcon icon={faGripVertical} />
            </span>
            <span className={styles.icon}>
                <FontAwesomeIcon title="Move to top" icon={faForwardStep} rotation={270} onClick={moveToTop(link.id)} />
            </span>
            <Editable value={link.text} onChange={update(link.id, "text")} />
            <Editable value={link.url } onChange={update(link.id, "url" )} />
            <LinkListSelect
                className={styles.listSelect}
                listId={link.subMenuId}
                onChange={update(link.id, "subMenuId")}
            />
        </CanEdit>
        <CanEdit no>{link.text} [{link.url}]</CanEdit>
        <CanDelete yes><DeleteBtn entityType="link" onClick={remove(link.id)} /></CanDelete>
    </div>;
}

export const LinkManagerComponent = ({
    links, isLoading,
    text, setText,
    url, setUrl,
    create, update, remove, sort, moveToTop,
}:LinkManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            <DndContext onDragEnd={sort}>
                <SortableContext items={links.map(linkId)} strategy={verticalListSortingStrategy}>
                    {links.map((link, i) => <LinkItem
                        key={link.id}
                        link={link}
                        index={i}
                        update={update}
                        remove={remove}
                        moveToTop={moveToTop}
                    />)}
                </SortableContext>
            </DndContext>
            <CanCreate yes>
                <Space.Compact style={{width: "100%"}}>
                    <Input
                        value={text}
                        onChange={onInputChange(setText)}
                        placeholder="Text"
                        className={styles.newLinkForm}
                        onPressEnter={create}
                    />
                    <Input
                        value={url}
                        onChange={onInputChange(setUrl)}
                        placeholder="Url"
                        className={styles.newLinkForm}
                        onPressEnter={create}
                    />
                    <Button onClick={create} variant="link"><FontAwesomeIcon icon={faAdd} /></Button>
                </Space.Compact>
            </CanCreate>
        </CanView>
        <CanView no>
            <Alert type="warning" message="You don't have permission to view links." />
        </CanView>
    </Spin>;
