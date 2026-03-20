import { overridable } from "@core/lib/overridable";
import { Icon } from "../SocialLinks.component";
import { BlueskyProps } from "./Bluesky.d";

export const BlueskyComponent = overridable(({className, css, handle}:BlueskyProps) => <>
    {css && <style>{css}</style>}
    <a className={className} href={`https://bsky.app/profile/${handle}`} target="_blank">
        <Icon slug="bluesky" />
    </a>
</>);

