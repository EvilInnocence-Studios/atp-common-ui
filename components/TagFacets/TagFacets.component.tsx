import { Button, Spin, Tag } from "antd";
import { Fragment } from "react/jsx-runtime";
import { TagFacetsProps } from "./TagFacets.d";
import styles from './TagFacets.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { prop, sort } from "ts-functional";
import { ITag } from "@common-shared/tag/types";

export const TagFacetsComponent = ({groups, selectedTagIds, removeTag, selectTag, isLoading, toggles}:TagFacetsProps) =>
    <div className={styles.tagGroupList}>
        <Spin spinning={isLoading}>
            {groups.filter(g => g.group.filterable).map(({group, tags}) => <Fragment key={group.id}>
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
                    {tags.slice(0, toggles.isset(group.name) ? 9999 : 6).sort(sort.by(prop<ITag, "order">("order")).asc).map(tag =>
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
