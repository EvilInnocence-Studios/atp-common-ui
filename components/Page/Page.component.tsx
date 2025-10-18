import { Spin } from "antd";
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar from 'remark-directive-sugar';
import { PageProps } from "./Page.d";
import styles from './Page.module.scss';

export const PageComponent = ({page, isLoading, notFound, notFoundPage}:PageProps) =>
    <Spin spinning={isLoading}>
        {notFound && <div className={styles.page}>
            <h1>{notFoundPage.title}</h1>
            <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{notFoundPage.content}</Markdown>
        </div>}
        {!notFound && page && <div className={styles.page}>
            <h1>{page.title}</h1>
            <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{page.content}</Markdown>
        </div>}
    </Spin>;
