import { ITagGroup } from "@common-shared/tag/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onCheckboxChange, onInputChange } from "@core/lib/onInputChange";
import { stopProp } from "@core/lib/util";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { faAdd, faArrowRight, faGripVertical, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Card, Checkbox, Col, Input, Row, Space, Spin } from "antd";
import clsx from "clsx";
import { prop, sort } from "ts-functional";
import { TagManager } from "../TagManager";
import { TagGroupManagerProps } from "./TagGroupManager.d";
import styles from "./TagGroupManager.module.scss";
import { ClearCacheButton } from "../ClearCacheButton";

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanDelete = hasPermission("tag.delete");
const CanCreate = hasPermission("tag.create");

const groupId = (tag:ITagGroup,  index:number) => `${tag.id}:${index}`;

const Group = ({group, update, remove, index, selectedGroup, setSelectedGroup}:any) => {
    const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({
        id: groupId(group, index),
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      } : undefined;
    return <div
        className={clsx([styles.tagGroup, selectedGroup === group.id && styles.selected])}
        style={style}
        ref={setNodeRef}
        {...attributes}
    >
        <span className={styles.tagHandle} ref={setActivatorNodeRef} {...listeners}>
            <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <Checkbox
            title="Filterable"
            checked={group.filterable}
            onChange={onCheckboxChange(update(group.id, "filterable"), true, false)}
            {...stopProp}
        />
        <Checkbox
            title="Visible"
            checked={group.visible}
            onChange={onCheckboxChange(update(group.id, "visible"), true, false)}
            {...stopProp}
        />
        <CanEdit yes><Editable value={group.name} onChange={update(group.id, "name")} /></CanEdit>
        <CanEdit no>{group.name}</CanEdit>
        <Button type="link" onClick={() => setSelectedGroup(group.id)}>tags <FontAwesomeIcon icon={faArrowRight} /></Button>
        <CanDelete yes><DeleteBtn entityType="tag group" onClick={remove(group.id)} /></CanDelete>
    </div>;
}

export const TagGroupManagerComponent = ({groups, isLoading, name, setName, create, sortGroups, ...handlers}:TagGroupManagerProps) =>
    <Spin spinning={isLoading}>
        <Space.Compact className={styles.cacheBtns}>
            <ClearCacheButton entity="tag group" cacheType="group" />
            <ClearCacheButton entity="tag" cacheType="tag" />
        </Space.Compact>
        <h1><FontAwesomeIcon icon={faTag} /> Tags</h1>

        <Row gutter={8}>
            <Col xs={6}>
                <DndContext onDragEnd={sortGroups}>
                    <div className={styles.tagGroupList}>
                        <SortableContext items={groups.map(groupId)} strategy={verticalListSortingStrategy}>
                            {groups
                                .sort(sort.by(prop<ITagGroup, "order">("order")).asc)
                                .map((group, i) => <Group key={group.id} className={styles.tagGroup} group={group} {...handlers} index={i}/>)
                            }
                        </SortableContext>
                    </div>
                </DndContext>
                <CanCreate yes>
                    <Card size="small"
                        className={styles.newTagGroupForm}
                        title={<>New Tag Group</>}
                        extra={<Button onClick={create} size="small" variant="link"><FontAwesomeIcon icon={faAdd} /> Create</Button>}
                    >
                        <Input value={name} onChange={onInputChange(setName)} placeholder="Name" />
                    </Card>
                </CanCreate>
            </Col>
            <Col xs={12}>
                <CanView yes>
                    {groups.find(g => g.id === handlers.selectedGroup) &&
                        <TagManager group={groups.find(g => g.id === handlers.selectedGroup) as ITagGroup} />
                    }
                </CanView>
                <CanView no>
                    <Alert type="warning" message="You don't have permission to view tags." />
                </CanView>
            </Col>
        </Row>
    </Spin>;
