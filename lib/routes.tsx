import { BannerManager } from "@common/components/BannerManager";
import { ContentManager } from "@common/components/ContentManager";
import { LinkListManager } from "@common/components/LinkListManager";
import { MediaManager } from "@common/components/MediaManager";
import { SettingsManager } from "@common/components/SettingsManager";
import { SynonymManager } from "@common/components/SynonymManager/SynonymManager.container";
import { TagGroupManager } from "@common/components/TagGroupManager";
import { withRoute } from "@core/lib/withRoute";

export const commonRoutes = {
    admin: [
        {path: "/tags",              component: TagGroupManager                                                            },
        {path: "/synonyms",          component: SynonymManager                                                             },
        {path: "/banners",           component: BannerManager                                                              },
        {path: "/settings",          component: SettingsManager                                                            },
        {path: "/links",             component: LinkListManager                                                            },
        {path: "/pages",             component: () => <ContentManager type="page" />                                       },
        {path: "/pages/:id",         component: withRoute(({id}:{id:string}) => <ContentManager type="page" id={id} />)    },
        {path: "/snippets",          component: () => <ContentManager type="snippet" />                                    },
        {path: "/snippets/:id",      component: withRoute(({id}:{id:string}) => <ContentManager type="snippet" id={id} />) },
        {path: "/media",             component: MediaManager                                                               },
    ]
}
