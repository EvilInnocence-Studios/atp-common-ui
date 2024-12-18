import { TagManager } from "@common/components/TagManager";
import { HomePage } from "@admin/components/HomePage";

export const commonRoutes = {
    admin: [
        {path: "/", component: HomePage},
        {path: "/tags", component: TagManager},
    ]
}