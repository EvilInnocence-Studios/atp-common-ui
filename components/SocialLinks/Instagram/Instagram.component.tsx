import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {InstagramProps} from "./Instagram.d";

export const InstagramComponent = overridable(({className, css, handle}:InstagramProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://www.instagram.com/${handle}`} target="_blank">
        <Icon slug="instagram" />
    </a>
</>);
