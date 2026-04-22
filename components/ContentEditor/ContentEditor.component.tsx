import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { MarkdownEditor } from "@core/components/MarkdownEditor";
import { onDateChange } from "@core/lib/onInputChange";
import { overridable } from "@core/lib/overridable";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutEditor, LayoutEditorProvider } from "@theming/components/LayoutManager/LayoutEditor";
import { Card, DatePicker, Switch } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";
import { ContentEditorProps } from "./ContentEditor.d";
import styles from './ContentEditor.module.scss';

export const ContentEditorComponent = overridable(({
    type, content,
    remove, updateString, updateToggle, updateObject, UpdateButtons,
    classes = styles,
}: ContentEditorProps) =>
    <div className={classes.contentEditor}>
        <Link to={`/${type}s`}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to {type}s
        </Link>
        <h1>
            Edit {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <div className={classes.updateButtons}>
            <DeleteBtn entityType={type} type="default" label={`Delete ${type}`} onClick={remove} />
            &nbsp;&nbsp;&nbsp;
            <UpdateButtons />
        </div>
        <DatePicker value={content.publishDate ? dayjs(content.publishDate) : undefined} onChange={onDateChange(updateString("publishDate"))} />
        &nbsp;
        <Switch checked={content.enabled} onChange={updateToggle("enabled")} checkedChildren="Enabled" unCheckedChildren="Disabled" />
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
        <Switch
            checked={content.format === "layout"}
            onChange={(checked) => { updateString("format")(checked ? "layout" : "markdown")}}
            checkedChildren="Layout"
            unCheckedChildren="Markdown"
        />
        <br/><br/>
        <Card title={type.charAt(0).toUpperCase() + type.slice(1)} className={classes.contentCard} size="small">
            {(content.format || "markdown") === "markdown" ? (
                <MarkdownEditor value={content.content || ""} onChange={updateString("content")} />
            ) : (
                <LayoutEditorProvider layout={content.layout} onChange={updateObject("layout")}>
                    <LayoutEditor theme={null} />
                </LayoutEditorProvider>
            )}
        </Card>
    </div>
);
