import { Agent, AppBskyFeedGetAuthorFeed, RichText } from "@atproto/api";
import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { BlueskyFeedComponent } from "./BlueskyFeed.component";
import { BlueskyFeedProps, IBlueskyFeedInputProps, IBlueskyFeedProps } from "./BlueskyFeed.d";
import { BlueskyFeedPropEditor } from "./BlueskyFeed.props";
import icon from './icon.svg';

const agent = new Agent({service: 'https://public.api.bsky.app'});

export const toMarkdown = async (text: string):Promise<string> => {
    const richText = new RichText({ text });
    await richText.detectFacets(agent);

    let markdown = ''
    for (const segment of richText.segments()) {
        if (segment.isLink()) {
            markdown += `[${segment.text}](${segment.link?.uri})`
        } else if (segment.isMention()) {
            markdown += `[${segment.text}](https://bsky.app/user/${segment.mention?.did})`
        } else {
            markdown += segment.text
        }
    }
    return markdown;
}

const injectBlueskyFeedProps = createInjector(({}:IBlueskyFeedInputProps):IBlueskyFeedProps => {
    const handle = useSetting("blueSkyHandle");
    const [feed, setFeed] = useState<AppBskyFeedGetAuthorFeed.OutputSchema | null>(null);

    useEffect(() => {
        if(handle) {
            const fetchData = async () => {
                try {
                    const response:AppBskyFeedGetAuthorFeed.Response = await agent.getAuthorFeed({actor: handle, limit: 20, filter: 'posts_no_replies'});
                    setFeed(response.data);
                } catch (error) {
                    console.error("Error fetching Bluesky profile:", error);
                }
            };
            fetchData();
        }
    }, [handle]);
console.log(feed);
    return {handle, feed};
});

const connect = inject<IBlueskyFeedInputProps, BlueskyFeedProps>(mergeProps(
    injectBlueskyFeedProps,
));
export const connectBlueskyFeed = connect;

export const BlueskyFeed = withLayoutMetadata(
    overridable<IBlueskyFeedInputProps>(connect(BlueskyFeedComponent)),
    {
        name: "BlueSkyFeed",
        displayName: "Bluesky Feed",
        category: "Social",
        description: "Bluesky Feed",
        icon,
        propEditor: BlueskyFeedPropEditor,
    }
);
