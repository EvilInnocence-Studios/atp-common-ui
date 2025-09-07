import { IContent } from "@common-shared/content/types";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Spin } from "antd";
import { Link } from "react-router";
import { ContentEditor } from "../ContentEditor";
import { ContentManagerProps } from "./ContentManager.d";
import styles from './ContentManager.module.scss';

export const ContentManagerComponent = ({id, type, pages, isLoading, create, refresh}:ContentManagerProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.contentManager}>
            <Row gutter={16}>
                <Col xs={6}>
                    <h2>
                        {type.charAt(0).toUpperCase() + type.slice(1)}s
                        &nbsp;
                        <Button onClick={create} type="primary" >
                            <FontAwesomeIcon icon={faPlus} /> Create New {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                    </h2>
                    <ul className={styles.pageList}>
                        {pages.map(page =>
                            <li key={page.id}>
                                <Link to={`/${type}s/${page.id}`}>
                                    <strong>{page.title}</strong> ({page.slug})
                                    &nbsp;
                                    <FontAwesomeIcon icon={page.enabled ? faCheck : faTimes} style={{color: page.enabled ? "green" : "red"}} />
                                </Link>
                            </li>
                        )}
                    </ul>
                </Col>
                <Col xs={18}>
                    {id && pages.length > 0 && pages.find(p => p.id === id) && <ContentEditor
                        type={type}
                        content={pages.find(p => p.id === id) as IContent}
                        onUpdate={() => refresh}
                    />}
                </Col>
            </Row>
        </div>
    </Spin>;
