import { Index } from "ts-functional/dist/types";

export declare interface IBlueskyFeedProps {
    theme: Index<string>;
    handle: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IBlueskyFeedInputProps {
    pageSize?: number;
}

export type BlueskyFeedProps = IBlueskyFeedInputProps & IBlueskyFeedProps;