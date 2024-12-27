import { ISynonym } from "@common-shared/synonym/types";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import {SynonymManagerComponent} from "./SynonymManager.component";
import {ISynonymManagerInputProps, SynonymManagerProps, ISynonymManagerProps} from "./SynonymManager.d";
import {partition} from 'ts-functional';

const injectSynonymManagerProps = createInjector(({}:ISynonymManagerInputProps):ISynonymManagerProps => {
    const [synonyms, setSynonyms] = useState<ISynonym[]>([]);
    const loader = useLoader();

    const refresh = () => {
        loader.start();
        services().synonym.search()
            .then(setSynonyms)
            .finally(loader.stop);
    }

    useEffect(refresh, []);
    
    return {synonyms: partition<ISynonym>(s => s.canonical)(synonyms), isLoading: loader.isLoading};
});

const connect = inject<ISynonymManagerInputProps, SynonymManagerProps>(mergeProps(
    injectSynonymManagerProps,
));

export const SynonymManager = connect(SynonymManagerComponent);
