import { overridable } from "@core/lib/overridable";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spin, Table } from "antd";
import { Link } from "react-router";
import { ClearCacheButton } from "../ClearCacheButton";
import { ContentManagerProps } from "./ContentManager.d";
import styles from './ContentManager.module.scss';

export const ContentManagerComponent = overridable(({ type, pages, isLoading, create, classes = styles }: ContentManagerProps) => {

    const renderLink = (record: any, content: React.ReactNode) => (
        <Link to={`/${type}s/${record.id}`} style={{ display: 'block', color: 'inherit' }}>
            {content}
        </Link>
    );

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: any) => renderLink(record, <strong>{text}</strong>),
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            render: (text: string, record: any) => renderLink(record, text),
        },
        {
            title: 'Enabled',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled: boolean, record: any) => renderLink(record, <FontAwesomeIcon icon={enabled ? faCheck : faTimes} style={{ color: enabled ? "green" : "red" }} />)
        },
        {
            title: 'Publish Date',
            dataIndex: 'publishDate',
            key: 'publishDate',
            render: (date: string | Date | undefined, record: any) => renderLink(record, date ? new Date(date).toLocaleString() : 'N/A')
        }
    ];

    return (
        <Spin spinning={isLoading}>
            <div className={classes.contentManager}>
                <h2>
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', width: '100%' }}>
                    <h2 style={{ margin: 0, flex: 1 }}>
                        <Button onClick={create} type="primary" >
                            <FontAwesomeIcon icon={faPlus} /> Create New {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                    </h2>
                    <div style={{ marginLeft: 'auto' }}>
                        <ClearCacheButton entity="content" cacheType={`content`} />
                    </div>
                </div>
                <Table 
                    columns={columns} 
                    dataSource={pages} 
                    rowKey="id" 
                    pagination={{ pageSize: 15 }} 
                />
            </div>
        </Spin>
    );
});
