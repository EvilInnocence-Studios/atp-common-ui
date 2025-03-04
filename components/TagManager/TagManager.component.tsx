import { ITag } from "@common-shared/tag/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onCheckboxChange, onInputChange } from "@core/lib/onInputChange";
import { stopProp } from "@core/lib/util";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { faAdd, faCopy, faForwardStep, faGripVertical, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Checkbox, Input, Space, Spin } from "antd";
import { Link } from "react-router";
import { TagManagerProps } from "./TagManager.d";
import styles from './TagManager.module.scss';
import { flash } from "@core/lib/flash";

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanCreate = hasPermission("tag.create");
const CanDelete = hasPermission("tag.delete");

const tagId = (tag:ITag,  index:number) => `${tag.id}:${index}`;

const TagItem = ({tag, update, remove, index, moveToTop}:any) => {
    const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({
        id: tagId(tag, index),
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      } : undefined;

    return <div className={styles.tag} key={tag.id} style={style} ref={setNodeRef} {...attributes}>
        <CanEdit yes>
            <span className={styles.icon} ref={setActivatorNodeRef} {...listeners}>
                <FontAwesomeIcon icon={faGripVertical} />
            </span>
            <span className={styles.icon}>
                <FontAwesomeIcon title="Move to top" icon={faForwardStep} rotation={270} onClick={moveToTop(tag.id)} />
            </span>
            <span className={styles.icon}>
                <Checkbox title="Visible" checked={tag.filterable} {...stopProp} onChange={onCheckboxChange(update(tag.id, "filterable"))}/>
            </span>
            <Link className={styles.icon} to={`/queue/${tag.groupId}/${tag.id}`}><FontAwesomeIcon icon={faListCheck} title="Create Queue" /></Link>
            <FontAwesomeIcon className={styles.icon} icon={faCopy} title="Copy id" onClick={(() => {
                navigator.clipboard.writeText(tag.id);
                flash.success(`Tag id ${tag.id} copied to clipboard`)();
            })} />
            <Editable value={tag.name} onChange={update(tag.id, "name")} />
        </CanEdit>
        <CanEdit no>{tag.name}</CanEdit>
        <CanDelete yes><DeleteBtn entityType="tag" onClick={remove(tag.id)} /></CanDelete>
    </div>;
}

export const TagManagerComponent = ({tags, isLoading, name, setName, create, update, remove, sort, moveToTop}:TagManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            <DndContext onDragEnd={sort}>
                <SortableContext items={tags.map(tagId)} strategy={verticalListSortingStrategy}>
                    {tags.map((tag, i) => <TagItem key={tag.id} tag={tag} index={i} update={update} remove={remove} moveToTop={moveToTop} />)}
                </SortableContext>
            </DndContext>
            <CanCreate yes>
                <Space.Compact style={{width: "100%"}}>
                    <Input
                        value={name}
                        onChange={onInputChange(setName)}
                        placeholder="Name"
                        className={styles.newTagForm}
                        onPressEnter={create}
                    />
                    <Button onClick={create} variant="link"><FontAwesomeIcon icon={faAdd} /></Button>
                </Space.Compact>
            </CanCreate>
        </CanView>
        <CanView no>
            <Alert type="warning" message="You don't have permission to view tags." />
        </CanView>
    </Spin>;
