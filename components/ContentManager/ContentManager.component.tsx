import { overridable } from "@core/lib/overridable";
import { faCheck, faFileExport, faFileImport, faPenToSquare, faPlus, faTag, faTimes, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, Modal, Space, Spin, Table, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ClearCacheButton } from "../ClearCacheButton";
import { ContentManagerProps } from "./ContentManager.d";
import styles from './ContentManager.module.scss';

export const ContentManagerComponent = overridable(({
    type,
    pages,
    isLoading,
    selectedRowKeys,
    setSelectedRowKeys,
    conflictState,
    create,
    onExport,
    onImportFile,
    resolveConflict,
    cancelConflict,
    classes = styles
}: ContentManagerProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImportFile(file);
        }
        if (e.target) {
            e.target.value = "";
        }
    };

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
            render: (text: string, record: any) => renderLink(record, <strong>{text || '(Untitled)'}</strong>),
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

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => {
            setSelectedRowKeys(keys);
        },
        onSelectAll: (selected: boolean) => {
            if (selected) {
                setSelectedRowKeys(pages.map(p => p.id));
            } else {
                setSelectedRowKeys([]);
            }
        }
    };

    const [newSlugInput, setNewSlugInput] = useState("");
    const [slugError, setSlugError] = useState("");

    const currentConflict = conflictState ? conflictState.conflicts[conflictState.currentIndex] : null;

    useEffect(() => {
        if (currentConflict) {
            let suggested = `${currentConflict.incoming.slug}-copy`;
            let counter = 1;
            while (pages.some(p => p.slug === suggested)) {
                counter++;
                suggested = `${currentConflict.incoming.slug}-copy-${counter}`;
            }
            setNewSlugInput(suggested);
            setSlugError("");
        }
    }, [conflictState?.currentIndex, currentConflict?.incoming?.slug, pages]);

    const handleSetNewSlug = () => {
        const trimmed = newSlugInput.trim();
        if (!trimmed) {
            setSlugError("Please enter a valid slug.");
            return;
        }
        if (trimmed === currentConflict?.incoming.slug) {
            setSlugError("The new slug must be different from the conflicting slug. Choose 'Overwrite' if you want to replace it.");
            return;
        }
        if (pages.some(p => p.slug === trimmed)) {
            setSlugError(`A record with slug "${trimmed}" already exists in the database.`);
            return;
        }
        if (conflictState?.nonConflicts.some(item => item.slug === trimmed)) {
            setSlugError(`A record with slug "${trimmed}" is already queued for import.`);
            return;
        }
        if (conflictState?.resolutions.some(r => r.newSlug === trimmed)) {
            setSlugError(`A record with slug "${trimmed}" was already assigned to another conflict in this batch.`);
            return;
        }
        setSlugError("");
        resolveConflict("rename", trimmed);
    };

    return (
        <Spin spinning={isLoading}>
            <div className={classes.contentManager}>
                <h2>
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', width: '100%', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <Button onClick={create} type="primary" >
                            <FontAwesomeIcon icon={faPlus} /> Create New {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                        <Button onClick={handleImportClick}>
                            <FontAwesomeIcon icon={faFileImport} /> Import
                        </Button>
                        <Button onClick={onExport} disabled={pages.length === 0}>
                            <FontAwesomeIcon icon={faFileExport} /> Export{selectedRowKeys.length > 0 ? ` (${selectedRowKeys.length})` : ''}
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept=".json,application/json"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <ClearCacheButton entity="content" cacheType={`content`} />
                    </div>
                </div>
                <Table 
                    rowSelection={rowSelection}
                    columns={columns} 
                    dataSource={pages} 
                    rowKey="id" 
                    pagination={{ pageSize: 15 }} 
                />

                {conflictState && currentConflict && (
                    <Modal
                        open={true}
                        onCancel={cancelConflict}
                        destroyOnClose
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#f0f6fc' }}>
                                <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#faad14" }} />
                                <span>
                                    Resolve Slug Conflict ({conflictState.currentIndex + 1} of {conflictState.conflicts.length})
                                </span>
                            </div>
                        }
                        width={880}
                        footer={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 8 }}>
                                <Button danger onClick={cancelConflict}>
                                    Cancel Import
                                </Button>
                                <Space wrap>
                                    <Button onClick={() => resolveConflict("skip")}>
                                        Skip
                                    </Button>
                                    <Button onClick={() => resolveConflict("skipAll")}>
                                        Skip All
                                    </Button>
                                    <Button type="primary" onClick={() => resolveConflict("overwrite")}>
                                        Overwrite
                                    </Button>
                                    <Button 
                                        type="primary" 
                                        style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }} 
                                        onClick={() => resolveConflict("overwriteAll")}
                                    >
                                        Overwrite All
                                    </Button>
                                </Space>
                            </div>
                        }
                    >
                        <div style={{ marginTop: 12, marginBottom: 16 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#f0f6fc', lineHeight: 1.5 }}>
                                A {type} with slug <code style={{ background: '#0d1117', color: '#79c0ff', border: '1px solid #30363d', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>{currentConflict.incoming.slug}</code> already exists in the system.
                                Choose whether to overwrite the existing record, skip it, or set a new slug:
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                            {/* Existing Record Card */}
                            <Card 
                                size="small" 
                                title={<span style={{ color: "#ff7875", fontWeight: 600 }}>Existing Record (In Database)</span>}
                                style={{ background: "#21262d", border: "1px solid #da3633", borderRadius: 8 }}
                                headStyle={{ borderBottom: "1px solid #30363d", background: "rgba(218, 54, 51, 0.15)" }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#e6edf3' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Title:</span>
                                        <span style={{ color: '#f0f6fc', fontWeight: 500 }}>
                                            {currentConflict.existing.title || <em style={{ color: '#6e7681' }}>(No Title)</em>}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Slug:</span>
                                        <code style={{ background: '#0d1117', color: '#ff7875', border: '1px solid #30363d', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}>
                                            {currentConflict.existing.slug}
                                        </code>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Status:</span>
                                        {currentConflict.existing.enabled ? (
                                            <Tag color="success">Enabled</Tag>
                                        ) : (
                                            <Tag color="error">Disabled</Tag>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Publish Date:</span>
                                        <span style={{ color: '#f0f6fc' }}>
                                            {currentConflict.existing.publishDate
                                                ? new Date(currentConflict.existing.publishDate).toLocaleString()
                                                : <span style={{ color: '#8b949e' }}>N/A</span>}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={{ color: '#8b949e', fontWeight: 600, marginBottom: 6 }}>Content:</div>
                                        <div style={{ 
                                            height: 200, 
                                            overflowY: 'auto', 
                                            background: '#0d1117', 
                                            color: '#e6edf3', 
                                            border: '1px solid #30363d', 
                                            padding: '8px 12px', 
                                            borderRadius: 6, 
                                            fontSize: 13, 
                                            lineHeight: 1.6,
                                            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word'
                                        }}>
                                            {currentConflict.existing.content ? currentConflict.existing.content : <em style={{ color: '#6e7681' }}>(Empty content)</em>}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Incoming Record Card */}
                            <Card 
                                size="small" 
                                title={<span style={{ color: "#58a6ff", fontWeight: 600 }}>Incoming Record (From File)</span>}
                                style={{ background: "#21262d", border: "1px solid #1f6feb", borderRadius: 8 }}
                                headStyle={{ borderBottom: "1px solid #30363d", background: "rgba(31, 111, 235, 0.15)" }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#e6edf3' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Title:</span>
                                        <span style={{ color: '#f0f6fc', fontWeight: 500 }}>
                                            {currentConflict.incoming.title || <em style={{ color: '#6e7681' }}>(No Title)</em>}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Slug:</span>
                                        <code style={{ background: '#0d1117', color: '#58a6ff', border: '1px solid #30363d', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}>
                                            {currentConflict.incoming.slug}
                                        </code>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Status:</span>
                                        {currentConflict.incoming.enabled ? (
                                            <Tag color="success">Enabled</Tag>
                                        ) : (
                                            <Tag color="error">Disabled</Tag>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Publish Date:</span>
                                        <span style={{ color: '#f0f6fc' }}>
                                            {currentConflict.incoming.publishDate
                                                ? new Date(currentConflict.incoming.publishDate).toLocaleString()
                                                : <span style={{ color: '#8b949e' }}>N/A</span>}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={{ color: '#8b949e', fontWeight: 600, marginBottom: 6 }}>Content:</div>
                                        <div style={{ 
                                            height: 200, 
                                            overflowY: 'auto', 
                                            background: '#0d1117', 
                                            color: '#e6edf3', 
                                            border: '1px solid #30363d', 
                                            padding: '8px 12px', 
                                            borderRadius: 6, 
                                            fontSize: 13, 
                                            lineHeight: 1.6,
                                            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word'
                                        }}>
                                            {currentConflict.incoming.content ? currentConflict.incoming.content : <em style={{ color: '#6e7681' }}>(Empty content)</em>}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Set New Slug Panel */}
                        <div style={{
                            background: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: 8,
                            padding: '12px 16px',
                            marginBottom: 16
                        }}>
                            <div style={{ color: '#f0f6fc', fontWeight: 600, fontSize: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#58a6ff' }} />
                                <span>Option: Keep both by setting a new slug for the incoming record</span>
                            </div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <Input 
                                    value={newSlugInput} 
                                    onChange={e => {
                                        setNewSlugInput(e.target.value);
                                        if (slugError) setSlugError("");
                                    }}
                                    onPressEnter={handleSetNewSlug}
                                    placeholder="Enter unique slug" 
                                    style={{ 
                                        background: '#0d1117', 
                                        color: '#f0f6fc', 
                                        borderColor: slugError ? '#ff4d4f' : '#30363d',
                                        fontFamily: 'monospace',
                                        flex: 1
                                    }}
                                />
                                <Button 
                                    type="primary"
                                    onClick={handleSetNewSlug}
                                    disabled={!newSlugInput.trim() || newSlugInput.trim() === currentConflict.incoming.slug}
                                    style={{ backgroundColor: '#1f6feb', borderColor: '#1f6feb' }}
                                >
                                    <FontAwesomeIcon icon={faTag} style={{ marginRight: 6 }} /> Set New Slug &amp; Create
                                </Button>
                            </div>
                            {slugError && (
                                <div style={{ color: '#ff7875', fontSize: 12, marginTop: 6, fontWeight: 500 }}>
                                    {slugError}
                                </div>
                            )}
                        </div>
                    </Modal>
                )}
            </div>
        </Spin>
    );
});

