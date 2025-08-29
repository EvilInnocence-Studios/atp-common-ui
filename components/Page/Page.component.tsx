import { Spin } from "antd";
import {PageProps} from "./Page.d";
import styles from './Page.module.scss';
import Markdown from "marked-react";
import { NotFoundPage } from "@public/components/NotFoundPage";

export const PageComponent = ({page, isLoading, notFound}:PageProps) =>
    <Spin spinning={isLoading}>
        {notFound && <NotFoundPage />}
        {!notFound && page && <div className={styles.page}>
            <h1>{page.title}</h1>
            <Markdown>{page.content}</Markdown>
        </div>}
    </Spin>;
