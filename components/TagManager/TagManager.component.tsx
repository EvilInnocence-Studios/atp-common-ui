import { ITag } from "@common-shared/tag/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { SortableList } from "@core/components/SortableList";
import { flash } from "@core/lib/flash";
import { onCheckboxChange, onInputChange } from "@core/lib/onInputChange";
import { stopProp } from "@core/lib/util";
import { faAdd, faCopy, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Checkbox, Input, Space, Spin } from "antd";
import { Link } from "react-router";
import { prop } from "ts-functional";
import { TagManagerProps } from "./TagManager.d";
import styles from './TagManager.module.scss';
import { overridable } from "@core/lib/overridable";

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanCreate = hasPermission("tag.create");
const CanDelete = hasPermission("tag.delete");

const tagId = (tag:ITag,  index:number) => `${tag.id}:${index}`;

export const TagItem = overridable(({item: tag, update, remove}:any) => {
    return <div className={styles.tag}>
        <CanEdit yes>
            <span className={styles.icon}>
                <Checkbox title="Visible" checked={tag.filterable} {...stopProp} onChange={onCheckboxChange(update(tag.id, "filterable"), true, false)}/>
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
});

export const TagManagerComponent = overridable(({tags, isLoading, name, setName, create, update, remove, sort}:TagManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            <SortableList<ITag>
                items={tags}
                getId={prop<any, any>("id")}
                getListId={tagId}
                sort={sort}
                ItemComponent={TagItem}
                itemProps={{update, remove}}
            />
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
    </Spin>
);
