import { ISynonym } from "@common-shared/synonym/types";
import { Setter } from 'unstateless';

export declare interface ISynonymCardProps {
    synonym: string;
    setSynonym: Setter<string>;
}

// What gets passed into the component from the parent as attributes
export declare interface ISynonymCardInputProps {
    canonical: string;
    synonyms: ISynonym[];
    add: (canonical: string, synonym: string) => () => void;
    remove: (ids: string[]) => () => void;
    classes?: any;
}

export type SynonymCardProps = ISynonymCardInputProps & ISynonymCardProps;