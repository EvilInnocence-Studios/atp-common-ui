import { Spin, Tag } from "antd";
import {EntityTagEditorProps} from "./EntityTagEditor.d";
import styles from './EntityTagEditor.module.scss';

export const EntityTagEditorComponent = ({allTags, entityTags, onAddTag, onRemoveTag, isLoading}:EntityTagEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.entityTagManager}>
            <div className={styles.tags}>
                {allTags.map(({group, tags}) => <div className={styles.tagGroup}>
                    <h5>{group.name}</h5>
                    {tags.map(tag =>
                        <Tag
                            className={styles.tag}
                            key={tag.id}
                            onClick={entityTags.find(t => t.id === tag.id)
                                ? () => onRemoveTag(tag.id)
                                : () => onAddTag(tag.id)
                            }
                            color={entityTags.find(t => t.id === tag.id) ? 'green' : 'red'}
                        >
                            {tag.name}
                        </Tag>
                    )}
                </div>)}
            </div>
        </div>
    </Spin>;
