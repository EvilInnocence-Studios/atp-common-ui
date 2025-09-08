import { Spin } from "antd";
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar from 'remark-directive-sugar';
import { Page } from "./Page.container";
import { PageProps } from "./Page.d";
import styles from './Page.module.scss';

export const PageComponent = ({page, isLoading, notFound, disable404}:PageProps) =>
    <Spin spinning={isLoading}>
        {notFound && !disable404 && <Page slug="404" disable404 />}
        {notFound && disable404 && <div className={styles.page}>
            <h1>404: Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>}
        {!notFound && page && <div className={styles.page}>
            <h1>{page.title}</h1>
            <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{page.content}</Markdown>
        </div>}
    </Spin>;
