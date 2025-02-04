import { Button, Spin, Tag } from "antd";
import { Fragment } from "react/jsx-runtime";
import { TagFacetsProps } from "./TagFacets.d";
import styles from './TagFacets.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const TagFacetsComponent = ({groups, selectedTagIds, removeTag, selectTag, isLoading, toggles}:TagFacetsProps) =>
    <div className={styles.tagGroupList}>
        <Spin spinning={isLoading}>
            {groups.map(({group, tags}) => <Fragment key={group.id}>
                <h3>
                    {group.name}
                    {tags.length > 6 && <>
                    {!toggles.isset(group.name) && <Button type="link" onClick={() => toggles.on(group.name)}>
                        <FontAwesomeIcon icon={faArrowDown} /> Show more
                    </Button>}
                    {toggles.isset(group.name) && <Button type="link" onClick={() => toggles.off(group.name)}>
                        <FontAwesomeIcon icon={faArrowUp} /> Show less
                    </Button>}
                </>}
                </h3>
                <div className={styles.tagList} key={group.id}>
                    {tags.slice(0, toggles.isset(group.name) ? 9999 : 6).map(tag =>
                        <Tag
                            key={tag.id}
                            color={selectedTagIds.includes(`${tag.id}`) ? 'blue' : undefined}
                            onClick={() => selectedTagIds.includes(`${tag.id}`) ? removeTag(`${tag.id}`) : selectTag(`${tag.id}`)}
                        >
                            {tag.name}
                        </Tag>
                    )}
                </div>
            </Fragment>)}
        </Spin>
    </div>;
