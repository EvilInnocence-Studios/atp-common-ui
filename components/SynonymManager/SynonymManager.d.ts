import { ISynonym } from "@common-shared/synonym/types";
import { Index } from 'ts-functional/dist/types';
import { Setter } from 'unstateless';

export declare interface ISynonymManagerProps {
    synonyms: Index<ISynonym[]>;
    isLoading: boolean;
    canonical: string;
    setCanonical: Setter<string>;
    synonym: string;
    setSynonym: Setter<string>;
    add: (canonical: string, synonym: string) => () => void;
    remove: (ids:string[]) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ISynonymManagerInputProps {

}

export type SynonymManagerProps = ISynonymManagerInputProps & ISynonymManagerProps;