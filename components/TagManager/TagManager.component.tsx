import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onCheckboxChange, onInputChange } from "@core/lib/onInputChange";
import { stopProp } from "@core/lib/util";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { faAdd, faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Checkbox, Input, Space, Spin } from "antd";
import { TagManagerProps } from "./TagManager.d";
import styles from './TagManager.module.scss';
import { ITag } from "@common-shared/tag/types";

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanCreate = hasPermission("tag.create");
const CanDelete = hasPermission("tag.delete");

const tagId = (tag:ITag,  index:number) => `${tag.id}:${index}`;

const TagItem = ({tag, update, remove, index}:any) => {
    const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({
        id: tagId(tag, index),
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      } : undefined;

    return <div className={styles.tag} key={tag.id} style={style} ref={setNodeRef} {...attributes}>
        <CanEdit yes>
            <span className={styles.tagHandle} ref={setActivatorNodeRef} {...listeners}>
                <FontAwesomeIcon icon={faGripLinesVertical} />
            </span>
            <Checkbox checked={tag.filterable} {...stopProp} onChange={onCheckboxChange(update(tag.id, "filterable"))}/>
            <Editable value={tag.name} onChange={update(tag.id, "name")} />
        </CanEdit>
        <CanEdit no>{tag.name}</CanEdit>
        <CanDelete yes><DeleteBtn entityType="tag" onClick={remove(tag.id)} /></CanDelete>
    </div>;
}

export const TagManagerComponent = ({tags, isLoading, name, setName, create, update, remove, sort}:TagManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            <DndContext onDragEnd={sort}>
                <SortableContext items={tags.map(tagId)} strategy={verticalListSortingStrategy}>
                    {tags.map((tag, i) => <TagItem key={tag.id} tag={tag} index={i} update={update} remove={remove} />)}
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
