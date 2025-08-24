import { BannerManager } from "@common/components/BannerManager";
import { LinkListManager } from "@common/components/LinkListManager";
import { PageManager } from "@common/components/PageManager";
import { SettingsManager } from "@common/components/SettingsManager";
import { SnippetManager } from "@common/components/SnippetManager";
import { SynonymManager } from "@common/components/SynonymManager/SynonymManager.container";
import { TagGroupManager } from "@common/components/TagGroupManager";

export const commonRoutes = {
    admin: [
        {path: "/tags",     component: TagGroupManager },
        {path: "/synonyms", component: SynonymManager  },
        {path: "/banners",  component: BannerManager   },
        {path: "/settings", component: SettingsManager },
        {path: "/links",    component: LinkListManager },
        {path: "/pages",    component: PageManager     },
        {path: "/snippets", component: SnippetManager  },
    ]
}