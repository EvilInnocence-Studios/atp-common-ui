import { BannerManager } from "@common/components/BannerManager";
import { SynonymManager } from "@common/components/SynonymManager/SynonymManager.container";
import { TagGroupManager } from "@common/components/TagGroupManager";

export const commonRoutes = {
    admin: [
        {path: "/tags",     component: TagGroupManager},
        {path: "/synonyms", component: SynonymManager },
        {path: "/banners",  component: BannerManager  },
    ]
}