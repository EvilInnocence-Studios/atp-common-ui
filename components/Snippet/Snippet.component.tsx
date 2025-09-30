import { Spin } from "antd";
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar from 'remark-directive-sugar';
import { SnippetProps } from "./Snippet.d";

export const SnippetComponent = ({snippet, isLoading}:SnippetProps) => <>
    {isLoading && <Spin spinning={isLoading} />}
    {!!snippet && <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{snippet.content}</Markdown>}
</>;
