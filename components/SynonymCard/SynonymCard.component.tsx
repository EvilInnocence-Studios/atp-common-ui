import { ISynonym } from "@common-shared/synonym/types";
import { DeleteBtn } from "@core/components/DeleteBtn/DeleteBtn.container";
import { onInputChange } from "@core/lib/onInputChange";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Input, Tag } from 'antd';
import { prop } from 'ts-functional';
import { SynonymCardProps } from "./SynonymCard.d";
import styles from './SynonymCard.module.scss';

export const SynonymCardComponent = ({canonical, synonyms, synonym, setSynonym, add, remove}:SynonymCardProps) =>
    <Card
        key={canonical}
        title={<>{canonical} <DeleteBtn entityType="synonym list" onClick={remove(synonyms.map(prop("id")))}/></>}
        className={styles.synonymCard}
        size="small"
        extra={<Input.Search
            size="small"
            className={styles.synonymInput}
            placeholder="Add synonym"
            value={synonym}
            onChange={onInputChange(setSynonym)}
            enterButton={<FontAwesomeIcon icon={faPlus} />}
            onSearch={add(canonical, synonym)}
        />}
    >
        {synonyms.map((synonym:ISynonym) => <Tag key={synonym.id} closable onClose={remove([synonym.id])}>
            {synonym.synonym}
        </Tag>)}                    
    </Card>;
