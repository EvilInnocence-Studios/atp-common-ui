import { onInputChange } from "@core/lib/onInputChange";
import { faPlus, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Space, Spin } from "antd";
import { SynonymCard } from "../SynonymCard/SynonymCard.container";
import { SynonymManagerProps } from "./SynonymManager.d";
import styles from './SynonymManager.module.scss';
import { ClearCacheButton } from "../ClearCacheButton";

export const SynonymManagerComponent = ({
    synonyms, isLoading,
    canonical, setCanonical,
    synonym, setSynonym,
    add, remove,
}:SynonymManagerProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.synonymManager}>
            <h1><FontAwesomeIcon icon={faRightLeft} /> Synonyms</h1>
            <ClearCacheButton entity="synonyms" cacheType="synonym" />
            <br/><br/>
            <Space.Compact className={styles.newSynonymForm}>
                <Input placeholder="Canonical" value={canonical} onChange={onInputChange(setCanonical)} />
                <Input.Search
                    placeholder="Synonym"
                    value={synonym}
                    onChange={onInputChange(setSynonym)}
                    onSearch={add(canonical, synonym)}
                    enterButton={<FontAwesomeIcon icon={faPlus} />}
                />
            </Space.Compact>
            <div className={styles.synonymList}>
                {Object.keys(synonyms).map(canonical => <SynonymCard
                    canonical={canonical}
                    synonyms={synonyms[canonical]}
                    add={add}
                    remove={remove}
                />)}
            </div>
        </div>
    </Spin>;
