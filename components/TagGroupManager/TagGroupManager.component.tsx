import { faAdd, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Card, Col, Input, Row, Spin } from "antd";
import { TagGroupManagerProps } from "./TagGroupManager.d";
import styles from "./TagGroupManager.module.scss";
import { onInputChange } from "@core/lib/onInputChange";
import { Editable } from "@core/components/Editable";
import { TagManager } from "../TagManager";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { hasPermission } from "@uac/components/HasPermission";

const CanView = hasPermission("tag.view");
const CanEdit = hasPermission("tag.update");
const CanDelete = hasPermission("tag.delete");
const CanCreate = hasPermission("tag.create");

export const TagGroupManagerComponent = ({groups, isLoading, name, setName, create, update, remove}:TagGroupManagerProps) =>
    <Spin spinning={isLoading}>
        <h1><FontAwesomeIcon icon={faTag} /> Tags</h1>

        <Row gutter={8}>
            <Col xs={6}>
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
                    {groups.map(g =>
                        <Card size="small"
                            key={g.id}
                            className={styles.tagGroupCard}
                            title={<>
                                <CanEdit yes><Editable value={g.name} onChange={update(g.id)} /></CanEdit>
                                <CanEdit no>{g.name}</CanEdit>
                            </>}
                            extra={<CanDelete yes><DeleteBtn entityType="tag group" onClick={remove(g.id)} /></CanDelete>}
                        >
                            <TagManager group={g} />
                        </Card>
                    )}
                </CanView>
                <CanView no>
                    <Alert type="warning" message="You don't have permission to view tags." />
                </CanView>
            </Col>
        </Row>
    </Spin>;
