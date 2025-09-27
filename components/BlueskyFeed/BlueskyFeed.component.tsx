import {BlueskyFeedProps} from "./BlueskyFeed.d";
import styles from './BlueskyFeed.module.scss';
import { BlueskyProfilePosts, BlueskyConfigProvider } from "bluesky-embed-react";

export const BlueskyFeedComponent = ({handle, theme}:BlueskyFeedProps) => <>
    {handle && <BlueskyConfigProvider
        backgroundColor={theme.bgLightColor}
        borderColor={theme.borderColor}
        textPrimaryColor={theme.secondaryColor}
        hideAvatars
        width="100%"
    >
        <BlueskyProfilePosts userHandle={handle} />
    </BlueskyConfigProvider>}
</>;
