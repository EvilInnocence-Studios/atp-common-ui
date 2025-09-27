import { BlueskyConfigProvider, BlueskyProfilePosts } from "bluesky-embed-react";
import { BlueskyFeedProps } from "./BlueskyFeed.d";

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
