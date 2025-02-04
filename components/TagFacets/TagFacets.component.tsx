import { Spin, Tag } from "antd";
import { Fragment } from "react/jsx-runtime";
import { TagFacetsProps } from "./TagFacets.d";
import styles from './TagFacets.module.scss';

export const TagFacetsComponent = ({groups, selectedTagIds, removeTag, selectTag, isLoading}:TagFacetsProps) =>
    <div className={styles.tagGroupList}>
        <Spin spinning={isLoading}>
            {groups.map(({group, tags}) => <Fragment key={group.id}>
                <h3>{group.name}</h3>
                <div className={styles.tagList} key={group.id}>
                    {tags.map(tag =>
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
