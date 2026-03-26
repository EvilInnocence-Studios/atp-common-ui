import { overridable } from "@core/lib/overridable";
import { LayoutComponent } from "@theming/components/LayoutComponent";
import { Spin } from "antd";
import clsx from "clsx";
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar from 'remark-directive-sugar';
import { PageProps } from "./Page.d";
import styles from './Page.module.scss';
import { PageHeader } from "./PageHeader";

export const PageComponent = overridable(({ page, isLoading, notFound, notFoundPage, classes = styles, className }: PageProps) =>
    <Spin spinning={isLoading}>
        {notFound && <>
            {notFoundPage.format === "layout" && notFoundPage.layout ? (
                <LayoutComponent {...notFoundPage.layout} />
            ) : <div className={classes.page}>
                <h1>{notFoundPage.title}</h1>
                <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{notFoundPage.content}</Markdown>
            </div>}
        </>}
        {!notFound && page && <>
            {page.format === "layout" && page.layout ? (
                <LayoutComponent {...page.layout} />
            ) : <div className={clsx(classes.page, className)}>
                <PageHeader page={page} />
                <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{page.content}</Markdown>
            </div>}
        </>}
    </Spin>
);
