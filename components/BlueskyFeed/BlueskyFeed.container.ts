import { createInjector, inject, mergeProps } from "unstateless";
import {BlueskyFeedComponent} from "./BlueskyFeed.component";
import {IBlueskyFeedInputProps, BlueskyFeedProps, IBlueskyFeedProps} from "./BlueskyFeed.d";
import { useSetting, useSettingGroup } from "@common/lib/setting/services";

const injectBlueskyFeedProps = createInjector(({}:IBlueskyFeedInputProps):IBlueskyFeedProps => {
    const handle = useSetting("blueSkyHandle");
    const theme = useSettingGroup("theme");

    return {handle, theme};
});

const connect = inject<IBlueskyFeedInputProps, BlueskyFeedProps>(mergeProps(
    injectBlueskyFeedProps,
));

export const BlueskyFeed = connect(BlueskyFeedComponent);
