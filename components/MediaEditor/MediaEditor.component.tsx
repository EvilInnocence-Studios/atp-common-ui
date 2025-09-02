import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin, Upload } from "antd";
import { MediaImage } from "../MediaImage";
import { MediaEditorProps } from "./MediaEditor.d";
import styles from './MediaEditor.module.scss';

export const MediaEditorComponent = ({image, isLoading, upload, updateString, UpdateButtons, remove}:MediaEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.mediaEditor}>
            <div className={styles.updateButtons}>
                <DeleteBtn entityType="banner" onClick={remove} />
                <UpdateButtons />
            </div>
            <MediaImage imageId={image.id} />
            <Upload.Dragger customRequest={({file}) => upload(file as File)} showUploadList={false}>
                <FontAwesomeIcon icon={faRefresh} /> Replace image
            </Upload.Dragger>
            <Label label="Title"><Editable value={image.title} onChange={updateString("title")}/></Label>
            <Label label="Caption"><Editable value={image.caption || ""} onChange={updateString("caption")}/></Label>
            <Label label="Alt Text"><Editable value={image.altText || ""} onChange={updateString("altText")}/></Label>
        </div>
    </Spin>;
