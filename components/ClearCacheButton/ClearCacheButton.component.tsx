import { Button, Spin } from "antd";
import {ClearCacheButtonProps} from "./ClearCacheButton.d";
import styles from './ClearCacheButton.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export const ClearCacheButtonComponent = ({entity, onClick, isLoading}:ClearCacheButtonProps) =>
    <Button type="primary" className={styles.clearCacheButton} onClick={onClick}>
        <Spin spinning={isLoading}>
            <FontAwesomeIcon icon={faArrowsRotate} />&nbsp;
            Clear {entity} Cache
        </Spin>
    </Button>
