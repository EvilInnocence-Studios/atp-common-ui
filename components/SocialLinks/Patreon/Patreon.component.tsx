import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {PatreonProps} from "./Patreon.d";

export const PatreonComponent = overridable(({className, css, handle}:PatreonProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://www.patreon.com/${handle}`} target="_blank">
        <Icon slug="patreon" />
    </a>
</>);
