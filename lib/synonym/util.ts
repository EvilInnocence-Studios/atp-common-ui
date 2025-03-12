import { ISynonym } from "@common-shared/synonym/types";
import { services } from "@core/lib/api";
import { useEffect } from "react";
import { memoize } from 'ts-functional';
import { useSharedState } from 'unstateless';

export const synonymReplace = memoize((str:string | null, synonyms:ISynonym[]) => !str ? "" : synonyms.reduce(
    (replaced:string, synonym:ISynonym) => replaced.replaceAll(synonym.synonym.toLocaleLowerCase(), synonym.canonical),
    str.toLocaleLowerCase()
), {});

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
