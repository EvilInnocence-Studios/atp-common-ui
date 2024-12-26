import { ISynonym } from "@common-shared/synonym/types";
import { Index } from 'ts-functional/dist/types';

export declare interface ISynonymManagerProps {
    synonyms: Index<ISynonym[]>;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ISynonymManagerInputProps {

}

export type SynonymManagerProps = ISynonymManagerInputProps & ISynonymManagerProps;