import { overridable } from "@core/lib/overridable";
import { Page } from "../Page";
import { RoutedCMSPageProps } from "./RoutedCMSPage.d";

export const RoutedCMSPageComponent = overridable(({className, css, slug}:RoutedCMSPageProps) => <>
    {css && <style>{css}</style>}
    <Page slug={slug} className={className} />
</>);

