import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {TwitterProps} from "./Twitter.d";

export const TwitterComponent = overridable(({className, css, handle}:TwitterProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://www.twitter.com/${handle}`} target="_blank">
        <Icon slug="x" />
    </a>
</>);
