import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {TiktokProps} from "./Tiktok.d";

export const TiktokComponent = overridable(({className, css, handle}:TiktokProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://www.tiktok.com/@${handle}`} target="_blank">
        <Icon slug="tiktok" />
    </a>
</>);
