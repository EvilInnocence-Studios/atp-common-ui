import { overridable } from "@core/lib/overridable";
import { MediaPickerProps } from "./MediaPicker.d";
import styles from './MediaPicker.module.scss';
import { Button, Col, Input, Modal, Row, Spin, Upload } from "antd";
import { onInputChange } from "@core/lib/onInputChange";
import { MediaImage } from "../MediaImage/MediaImage.container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer, faUpload } from "@fortawesome/free-solid-svg-icons";

export const MediaPickerComponent = overridable(({
    classes = styles,
    imageId,
    settingKey,
    isModalVisible,
    setIsModalVisible,
    images,
    query,
    setQuery,
    upload,
    isLoading,
    onSelect
}: MediaPickerProps) => {
    return <div className={classes.mediaPicker}>
        <Spin spinning={isLoading}>
            <MediaImage className={classes.imagePreview} imageId={imageId} settingKey={settingKey} />
            <br />
            <Upload.Dragger customRequest={({ file }) => upload(file as File)} showUploadList={false}>
                <p className="ant-upload-text">
                    <FontAwesomeIcon icon={faUpload} /> Click or drag to upload.
                </p>
            </Upload.Dragger>

            <Button type="default" style={{ marginTop: 16 }} onClick={() => setIsModalVisible(true)} block>
                <FontAwesomeIcon icon={faHandPointer} /> Choose Existing Media
            </Button>
        </Spin>

        <Modal
            title="Choose Media"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width="90vw"
        >
            <Spin spinning={isLoading}>
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col xs={24}>
                        <Input.Search placeholder="Search..." value={query} onChange={onInputChange(setQuery)} />
                    </Col>
                </Row>
                <div style={{ maxHeight: '60vh', overflowY: 'auto', overflowX: 'hidden' }}>
                    <Row gutter={[16, 16]}>
                        {images.map(image => (
                            <Col key={image.id} xs={8} sm={6} md={4}>
                                <div
                                    className={classes.selectableImage}
                                    onClick={() => {
                                        onSelect(image.id);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    <div className={classes.thumbnailWrapper}>
                                        <MediaImage imageId={image.id} />
                                    </div>
                                    <div className={classes.imageName}>{image.title || image.url}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Spin>
        </Modal>
    </div>
});
