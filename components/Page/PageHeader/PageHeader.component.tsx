import { overridable } from "@core/lib/overridable";
import { PageHeaderProps } from "./PageHeader.d";

export const PageHeaderComponent = overridable<PageHeaderProps>(({page}:PageHeaderProps) =>
    <h1>{page.title}</h1>
);
