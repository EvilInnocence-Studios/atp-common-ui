import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onCheckboxChange, onInputChange } from "@core/lib/onInputChange";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Checkbox, Input, Space, Spin } from "antd";
import { TagManagerProps } from "./TagManager.d";
import styles from './TagManager.module.scss';

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanCreate = hasPermission("tag.create");
const CanDelete = hasPermission("tag.delete");

export const TagManagerComponent = ({tags, isLoading, name, setName, create, update, remove}:TagManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            {tags.map(tag => <div className={styles.tag} key={tag.id}>
                <CanEdit yes>
                    <Checkbox checked={tag.filterable} onChange={onCheckboxChange(update(tag.id, "filterable"))}/>
                    <Editable value={tag.name} onChange={update(tag.id, "id")} />
                </CanEdit>
                <CanEdit no>{tag.name}</CanEdit>
                <CanDelete yes><DeleteBtn entityType="tag" onClick={remove(tag.id)} /></CanDelete>
            </div>)}
            <CanCreate yes>
                <Space.Compact>
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
