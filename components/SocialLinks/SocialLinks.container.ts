import { createInjector, inject, mergeProps } from "unstateless";
import {SocialLinksComponent} from "./SocialLinks.component";
import {ISocialLinksInputProps, SocialLinksProps, ISocialLinksProps} from "./SocialLinks.d";
import { useSetting } from "@common/lib/setting/services";

const injectSocialLinksProps = createInjector(({}:ISocialLinksInputProps):ISocialLinksProps => {
    const facebook  = useSetting("facebookPage"   );
    const twitter   = useSetting("twitterHandle"  );
    const blueSky   = useSetting("blueSkyHandle"  );
    const instagram = useSetting("instagramHandle");
    const patreon   = useSetting("patreonHandle"  );
    const youtube   = useSetting("youtubeChannel" );
    const tikTok    = useSetting("tikTokHandle"   );
    const kofi      = useSetting("kofiHandle"     );

    return {facebook, twitter, blueSky, instagram, patreon, youtube, tikTok, kofi};
});

const connect = inject<ISocialLinksInputProps, SocialLinksProps>(mergeProps(
    injectSocialLinksProps,
));

export const SocialLinks = connect(SocialLinksComponent);
