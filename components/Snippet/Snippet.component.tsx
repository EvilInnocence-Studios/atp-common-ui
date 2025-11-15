import { Spin } from "antd";
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar from 'remark-directive-sugar';
import { SnippetProps } from "./Snippet.d";
import { overridable } from "@core/lib/overridable";

export const SnippetComponent = overridable(({snippet, isLoading}:SnippetProps) => <>
    {isLoading && <Spin spinning={isLoading} />}
    {!!snippet && <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{snippet.content}</Markdown>}
</>);
