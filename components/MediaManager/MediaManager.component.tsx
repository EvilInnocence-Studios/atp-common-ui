import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Col, Input, Row, Spin, Upload } from "antd";
import { ClearCacheButton } from "../ClearCacheButton";
import { MediaEditor } from "../MediaEditor";
import { MediaManagerProps } from "./MediaManager.d";
import styles from './MediaManager.module.scss';
import { onInputChange } from "@core/lib/onInputChange";
import { overridable } from "@core/lib/overridable";

export const MediaManagerComponent = overridable(({images, isLoading, upload, overwrite, setOverwrite, refresh, query, setQuery}:MediaManagerProps) =>
    <Spin spinning={isLoading}>
        <Row className={styles.mediaManager} gutter={16}>
            <Col xs={3}>
                <h1><FontAwesomeIcon icon={faImage} /> Media</h1>
                <ClearCacheButton entity="media" cacheType="media" />
            </Col>
            <Col xs={18}>
                <Upload.Dragger customRequest={({file}) => upload(file as File)} showUploadList={false}>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload.<br/>
                        <Checkbox checked={overwrite} onClick={e => e.stopPropagation()} onChange={(e) => setOverwrite(e.target.checked)}>Overwrite</Checkbox>
                    </p>                    
                </Upload.Dragger>
            </Col>
            <Col xs={24}>
                <Row gutter={16} className={styles.searchRow}>
                    <Col xs={24}>
                        <Input.Search placeholder="Search..." value={query} onChange={onInputChange(setQuery)} />
                    </Col>
                </Row>
                <Row gutter={16} className={styles.mediaList}>
                    {images.map(image => <Col key={image.id} xs={6}>
                        <MediaEditor imageId={image.id} onDelete={refresh} />
                    </Col>)}
                </Row>                                        
            </Col>
        </Row>
    </Spin>
);
