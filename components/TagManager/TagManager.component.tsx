import { Alert, Button, Input, Space, Spin, Tag } from "antd";
import {TagManagerProps} from "./TagManager.d";
import styles from './TagManager.module.scss';
import { onInputChange } from "@core/lib/onInputChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Editable } from "@core/components/Editable";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { hasPermission } from "@uac/components/HasPermission";

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanCreate = hasPermission("tag.create");
const CanDelete = hasPermission("tag.delete");

export const TagManagerComponent = ({tags, isLoading, name, setName, create, update, remove}:TagManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            {tags.map(tag => <div className={styles.tag} key={tag.id}>
                <CanEdit yes><Editable value={tag.name} onChange={update(tag.id)} /></CanEdit>
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
