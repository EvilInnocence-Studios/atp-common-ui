import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Spin, Upload } from "antd";
import { BannerEditor } from "../BannerEditor";
import { BannerManagerProps } from "./BannerManager.d";
import styles from './BannerManager.module.scss';

export const BannerManagerComponent = ({banners, isLoading, upload}:BannerManagerProps) =>
    <Spin spinning={isLoading}>
        <Row className={styles.bannerManager} gutter={16}>
            <Col xs={3}>
                <h1><FontAwesomeIcon icon={faImage} /> Banners</h1>
            </Col>
            <Col xs={18}>
                <Upload.Dragger customRequest={({file}) => upload(file as File)} showUploadList={false}>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Col>
            <Col xs={24}>
                <Row gutter={16} className={styles.bannerList}>
                    {banners.map(banner => <Col key={banner.id} xs={6}>
                        <BannerEditor bannerId={banner.id} />
                    </Col>)}
                </Row>                                        
            </Col>
        </Row>
    </Spin>;
