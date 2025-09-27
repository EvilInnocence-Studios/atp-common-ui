import { BlueskyConfigProvider, BlueskyProfilePosts } from "bluesky-embed-react";
import { BlueskyFeedProps } from "./BlueskyFeed.d";
import styles from "./BlueskyFeed.module.scss";

export const BlueskyFeedComponent = ({handle, theme, pageSize}:BlueskyFeedProps) => <>
    {handle && <BlueskyConfigProvider
        backgroundColor={theme.bgLightColor}
        borderColor={theme.borderColor}
        textPrimaryColor={theme.secondaryColor}
        hideAvatars
        width="100%"
    >
        <div className={styles.feed}>
            <BlueskyProfilePosts userHandle={handle} pageSize={pageSize}/>
        </div>
    </BlueskyConfigProvider>}
</>;
