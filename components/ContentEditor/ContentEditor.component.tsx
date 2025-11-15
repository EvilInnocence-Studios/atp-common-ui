import { Editable } from "@core/components/Editable";
import {ContentEditorProps} from "./ContentEditor.d";
import styles from './ContentEditor.module.scss';
import { MarkdownEditor } from "@core/components/MarkdownEditor";
import { Card, DatePicker, Switch } from "antd";
import { Label } from "@core/components/Label";
import dayjs from "dayjs";
import { onDateChange } from "@core/lib/onInputChange";
import { overridable } from "@core/lib/overridable";

export const ContentEditorComponent = overridable(({type, content, updateString, updateToggle, UpdateButtons}:ContentEditorProps) =>
    <div className={styles.contentEditor}>
        <h1>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
        <div className={styles.updateButtons}>
            <UpdateButtons />
        </div>
        <DatePicker value={content.publishDate ? dayjs(content.publishDate) : undefined} onChange={onDateChange(updateString("publishDate"))}/>
        &nbsp;
        <Switch checked={content.enabled} onChange={updateToggle("enabled")} checkedChildren="Enabled" unCheckedChildren="Disabled"/>
        <h1>
            <Label label="Title">
                <Editable value={content.title || ""} onChange={updateString("title")} />
            </Label>
        </h1>
        <h3>
            <Label label="Slug">
                <Editable value={content.slug || ""} onChange={updateString("slug")} />
            </Label>
        </h3>
        <Card title={type.charAt(0).toUpperCase() + type.slice(1)} className={styles.contentCard} size="small">
            <MarkdownEditor value={content.content || ""} onChange={updateString("content")} />
        </Card>
    </div>
);
