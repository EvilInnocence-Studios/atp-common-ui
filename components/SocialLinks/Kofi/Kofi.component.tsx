import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {KofiProps} from "./Kofi.d";

export const KofiComponent = overridable(({className, css, handle}:KofiProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://ko-fi.com/${handle}`} target="_blank">
        <Icon slug="ko-fi" />
    </a>
</>);
