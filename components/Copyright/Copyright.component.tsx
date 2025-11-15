import { overridable } from "@core/lib/overridable";
import { CopyrightProps } from "./Copyright.d";

export const CopyrightComponent = overridable(({copyright}:CopyrightProps) => <>{copyright}</>);
