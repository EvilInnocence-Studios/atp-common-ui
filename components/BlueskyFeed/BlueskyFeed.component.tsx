import {BlueskyFeedProps} from "./BlueskyFeed.d";
import styles from './BlueskyFeed.module.scss';
import { BlueskyProfilePosts, BlueskyConfigProvider } from "bluesky-embed-react";

export const BlueskyFeedComponent = ({handle, theme}:BlueskyFeedProps) =>
    <BlueskyConfigProvider
        
    >
        <BlueskyProfilePosts userHandle={handle} />
    </BlueskyConfigProvider>;
