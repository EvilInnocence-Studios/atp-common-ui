import { overridable } from "@core/lib/overridable";
import {SnippetProps} from "./Snippet.d";
import styles from './Snippet.module.scss';

export const SnippetComponent = overridable(({classes = styles}:SnippetProps) =>
    <div>Snippet component goes here.</div>
);
