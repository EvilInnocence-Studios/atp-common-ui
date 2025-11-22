import { Spin, Switch, Tag } from "antd";
import { EntityTagEditorProps } from "./EntityTagEditor.d";
import styles from './EntityTagEditor.module.scss';
import { overridable } from "@core/lib/overridable";

export const EntityTagEditorComponent = overridable(({ allTags, entityTags, onAddTag, onRemoveTag, isLoading, showHiddenTags, setShowHiddenTags, classes = styles }: EntityTagEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={classes.entityTagManager}>
            <div className={classes.controls}>
                Hidden tags&nbsp;
                <Switch title="Hidden tags" checkedChildren="Shown" unCheckedChildren="Hidden" defaultChecked={showHiddenTags} onChange={setShowHiddenTags} />
            </div>
            <div className={classes.tags}>
                {allTags.filter(({ group }) => showHiddenTags || group.filterable).map(({ group, tags }) => <div className={classes.tagGroup}>
                    <h5>{group.name}</h5>
                    {tags.filter(tag => showHiddenTags || tag.filterable).map(tag =>
                        <Tag
                            className={classes.tag}
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
    </Spin>
);
