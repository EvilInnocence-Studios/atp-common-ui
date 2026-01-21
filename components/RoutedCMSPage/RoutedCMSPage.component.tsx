import { overridable } from "@core/lib/overridable";
import {RoutedCMSPageProps} from "./RoutedCMSPage.d";
import styles from './RoutedCMSPage.module.scss';
import { Page } from "../Page";

export const RoutedCMSPageComponent = overridable(({classes = styles, slots, __layoutId, className, css, slug}:RoutedCMSPageProps) => <>
    {css && <style>{css}</style>}
    <Page slug={slug} className={className} />
</>);

