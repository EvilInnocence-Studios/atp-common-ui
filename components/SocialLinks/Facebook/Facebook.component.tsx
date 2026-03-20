import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {FacebookProps} from "./Facebook.d";

export const FacebookComponent = overridable(({className, css, handle}:FacebookProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://www.facebook.com/${handle}`} target="_blank">
        <Icon slug="facebook" />
    </a>
</>);
