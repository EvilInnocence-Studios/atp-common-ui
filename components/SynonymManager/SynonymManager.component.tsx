import { ISynonym } from "@common-shared/synonym/types";
import { faPlus, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Input, Space, Spin, Tag } from "antd";
import { SynonymManagerProps } from "./SynonymManager.d";
import styles from './SynonymManager.module.scss';

export const SynonymManagerComponent = ({synonyms, isLoading}:SynonymManagerProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.synonymManager}>
            <h1><FontAwesomeIcon icon={faRightLeft} /> Synonyms</h1>
            <Space.Compact className={styles.newSynonymForm}>
                <Input placeholder="Canonical" />
                <Input.Search
                    placeholder="Synonym"
                    enterButton={<FontAwesomeIcon icon={faPlus} />}
                />
            </Space.Compact>
            <div className={styles.synonymList}>
                {Object.keys(synonyms).map(canonical => <Card
                    key={canonical}
                    title={canonical}
                    className={styles.synonymCard}
                    size="small"
                    extra={<Input.Search
                        size="small"
                        placeholder="Add synonym"
                        enterButton={<FontAwesomeIcon icon={faPlus} />}
                        onSearch={value => console.log(value)}
                    />}
                >
                    {synonyms[canonical].map((synonym:ISynonym) => <Tag key={synonym.id} closable>
                        {synonym.synonym}
                    </Tag>)}                    
                </Card>)}
            </div>
        </div>
    </Spin>;
