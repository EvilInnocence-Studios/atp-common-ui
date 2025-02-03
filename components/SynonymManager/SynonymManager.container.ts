import { ISynonym } from "@common-shared/synonym/types";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import {SynonymManagerComponent} from "./SynonymManager.component";
import {ISynonymManagerInputProps, SynonymManagerProps, ISynonymManagerProps} from "./SynonymManager.d";
import {partition} from 'ts-functional';
import { flash } from "@core/lib/flash";
import { clear } from "@core/lib/util";

const injectSynonymManagerProps = createInjector(({}:ISynonymManagerInputProps):ISynonymManagerProps => {
    const [synonyms, setSynonyms] = useState<ISynonym[]>([]);
    const loader = useLoader();
    const [newCanonical, setCanonical] = useState("");
    const [newSynonym, setSynonym] = useState("");

    const add = (canonical: string, synonym: string) => () => {
        loader.start();
        services().synonym.create({canonical, synonym})
            .then(newSynonym => setSynonyms([...synonyms, newSynonym]))
            .then(flash.success("Synonym created"))
            .then(clear(setCanonical, setSynonym))
            .finally(loader.stop);
    }

    const remove = (ids:string[]) => () => {
        console.log(ids);
        loader.start();
        Promise.all(ids.map(services().synonym.remove))
            .then(flash.success("Synonym(s) deleted"))
            .then(refresh)
            .finally(loader.stop);
    }

    const refresh = () => {
        loader.start();
        services().synonym.search()
            .then(setSynonyms)
            .finally(loader.stop);
    }

    useEffect(refresh, []);
    
    return {
        synonyms: partition<ISynonym>(s => s.canonical)(synonyms),
        isLoading: loader.isLoading,
        canonical: newCanonical, setCanonical,
        synonym: newSynonym, setSynonym,
        add, remove
    };
});

const connect = inject<ISynonymManagerInputProps, SynonymManagerProps>(mergeProps(
    injectSynonymManagerProps,
));

export const SynonymManager = connect(SynonymManagerComponent);
