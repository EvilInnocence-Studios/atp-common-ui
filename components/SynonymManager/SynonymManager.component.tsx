import {SynonymManagerProps} from "./SynonymManager.d";
import styles from './SynonymManager.module.scss';

export const SynonymManagerComponent = ({synonyms, isLoading}:SynonymManagerProps) =>
    <div>{JSON.stringify(synonyms)}</div>;
