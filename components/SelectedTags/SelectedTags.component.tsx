import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin, Tag } from "antd";
import { SelectedTagsProps } from "./SelectedTags.d";
import styles from './SelectedTags.module.scss';
import { overridable } from "@core/lib/overridable";

export const SelectedTagsComponent = overridable(({selectedTagIds, clearSearch, q, removeTag, groups, clearAll, isLoading}:SelectedTagsProps) =>
    <div className={styles.selectedTagList}>
        <Spin spinning={isLoading}>
            {!!q && <Tag color="blue" onClick={clearSearch}><FontAwesomeIcon icon={faSearch} /> {q}</Tag>}
            {selectedTagIds.map(tagId =>
                <Tag key={tagId} color="blue" onClick={() => removeTag(tagId)}>
                    <FontAwesomeIcon icon={faTag} />
                    {groups.reduce((acc, {tags}) => {
                        const tag = tags.find(tag => `${tag.id}` === tagId);
                        return tag ? [...acc, tag.name] : acc;
                    }, [] as string[]).join(', ')}
                </Tag>
            )}
            {(selectedTagIds.length > 0 || !!q) && <Tag onClick={clearAll}>Clear all</Tag>}
        </Spin>
    </div>
);
