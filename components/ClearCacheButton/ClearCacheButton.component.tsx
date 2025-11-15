import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Spin } from "antd";
import { ClearCacheButtonProps } from "./ClearCacheButton.d";
import styles from './ClearCacheButton.module.scss';
import { overridable } from "@core/lib/overridable";

export const ClearCacheButtonComponent = overridable(({entity, onClick, isLoading, clearAll}:ClearCacheButtonProps) =>
    <Dropdown.Button
        menu={{
            items: [{key: 'all', label: "Clear all caches"}],
            onClick: clearAll,
        }}
        type="primary"
        className={styles.clearCacheButton}
        onClick={onClick}
    >
        <Spin spinning={isLoading}>
            <FontAwesomeIcon icon={faArrowsRotate} />&nbsp;
            Clear {entity} cache
        </Spin>
    </Dropdown.Button>
);
