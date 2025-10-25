import { AppBskyFeedGetAuthorFeed } from "@atproto/api";
import { Index } from "ts-functional/dist/types";

export declare interface IBlueskyFeedProps {
    handle: string;
    feed: AppBskyFeedGetAuthorFeed.OutputSchema | null;
}

// What gets passed into the component from the parent as attributes
export declare interface IBlueskyFeedInputProps {
    pageSize?: number;
}

export type BlueskyFeedProps = IBlueskyFeedInputProps & IBlueskyFeedProps;