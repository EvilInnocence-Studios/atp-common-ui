import { ISynonym } from "@common-shared/synonym/types";
import { services } from "@core/lib/api";
import { useEffect } from "react";
import {useSharedState} from 'unstateless';
import {memoizePromise} from 'ts-functional';

export const synonymReplace = (str:string, synonyms:ISynonym[]) => synonyms.reduce(
    (replaced:string, synonym:ISynonym) => replaced.replaceAll(synonym.synonym, synonym.canonical),
    str
);

export const useSynonymsRaw = useSharedState<ISynonym[]>("synonyms", []);

export const useSynonyms = () => {
    const [synonyms, setSynonyms] = useSynonymsRaw();

    useEffect(() => {
        if(synonyms.length === 0) {
            services().synonym.search().then(setSynonyms);
        }
    }, []);

    return synonyms;
}
