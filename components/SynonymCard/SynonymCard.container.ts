import { useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { SynonymCardComponent } from "./SynonymCard.component";
import { ISynonymCardInputProps, ISynonymCardProps, SynonymCardProps } from "./SynonymCard.d";

const injectSynonymCardProps = createInjector(({}:ISynonymCardInputProps):ISynonymCardProps => {
    const [synonym, setSynonym] = useState("");

    return {synonym, setSynonym};
});

const connect = inject<ISynonymCardInputProps, SynonymCardProps>(mergeProps(
    injectSynonymCardProps,
));

export const SynonymCard = connect(SynonymCardComponent);
