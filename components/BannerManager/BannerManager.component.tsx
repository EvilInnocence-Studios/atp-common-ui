import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Col, Row, Spin, Upload } from "antd";
import { BannerEditor } from "../BannerEditor";
import { BannerManagerProps } from "./BannerManager.d";
import styles from './BannerManager.module.scss';
import { ClearCacheButton } from "../ClearCacheButton";

export const BannerManagerComponent = ({banners, isLoading, upload, overwrite, setOverwrite, refresh}:BannerManagerProps) =>
    <Spin spinning={isLoading}>
        <Row className={styles.bannerManager} gutter={16}>
            <Col xs={3}>
                <h1><FontAwesomeIcon icon={faImage} /> Banners</h1>
                <ClearCacheButton entity="banner" cacheType="banner" />
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
                <Row gutter={16} className={styles.bannerList}>
                    {banners.map(banner => <Col key={banner.id} xs={6}>
                        <BannerEditor bannerId={banner.id} onDelete={refresh} />
                    </Col>)}
                </Row>                                        
            </Col>
        </Row>
    </Spin>;
