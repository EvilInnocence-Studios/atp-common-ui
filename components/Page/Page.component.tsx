import { overridable } from "@core/lib/overridable";
import { Spin } from "antd";
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar from 'remark-directive-sugar';
import { PageProps } from "./Page.d";
import styles from './Page.module.scss';
import { PageHeader } from "./PageHeader";

export const PageComponent = overridable(({ page, isLoading, notFound, notFoundPage, classes = styles }: PageProps) =>
    <Spin spinning={isLoading}>
        {notFound && <div className={classes.page}>
            <h1>{notFoundPage.title}</h1>
            <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{notFoundPage.content}</Markdown>
        </div>}
        {!notFound && page && <div className={classes.page}>
            <PageHeader page={page} />
            <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{page.content}</Markdown>
        </div>}
    </Spin>
);
