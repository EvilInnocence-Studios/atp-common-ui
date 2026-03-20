import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import {YoutubeProps} from "./Youtube.d";

export const YoutubeComponent = overridable(({className, css, handle}:YoutubeProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://www.youtube.com/@${handle}`} target="_blank">
        <Icon slug="youtube" />
    </a>
</>);
