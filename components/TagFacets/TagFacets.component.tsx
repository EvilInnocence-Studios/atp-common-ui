import { ITag } from "@common-shared/tag/types";
import { Checkbox, Collapse, Spin, Tag } from "antd";
import { intersection, prop, sort } from "ts-functional";
import { TagFacetsProps } from "./TagFacets.d";
import styles from './TagFacets.module.scss';

export const TagFacetsComponent = ({groups, selectedTagIds, removeTag, selectTag, isLoading}:TagFacetsProps) =>
    <div className={styles.tagGroupList}>
        <Spin spinning={isLoading}>
            <Collapse>
                {groups.filter(g => g.group.visible).sort((a, b) => a.group.order - b.group.order).map(({group, tags}) =>
                    <Collapse.Panel
                        header={<>
                            {group.name}
                            {intersection(tags.map(prop("id")), selectedTagIds).length > 0 && <> &nbsp;<Tag>{intersection(tags.map(prop("id")), selectedTagIds).length} selected</Tag></>}
                        </>}
                        key={group.id}
                    >
                        <div className={styles.tagList} key={group.id}>
                            {tags.sort(sort.by(prop<ITag, "order">("order")).asc).map(tag =>
                                <Checkbox
                                    key={tag.id}
                                    className={styles.tagCheckbox}
                                    checked={selectedTagIds.includes(`${tag.id}`)}
                                    onChange={() => selectedTagIds.includes(`${tag.id}`) ? removeTag(`${tag.id}`) : selectTag(`${tag.id}`)}
                                >{tag.name}</Checkbox>
                            )}
                        </div>
                    </Collapse.Panel>
                )}
            </Collapse>
        </Spin>
    </div>;
