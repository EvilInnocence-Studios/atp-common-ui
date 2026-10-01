import { ILinkList } from "@common-shared/link/types";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { onInputChange } from "@core/lib/onInputChange";
import { overridable } from "@core/lib/overridable";
import { faAdd, faArrowRight, faFileExport, faFileImport, faLink, faPenToSquare, faTag, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Alert, Button, Card, Checkbox, Col, Input, Modal, Row, Space, Spin } from "antd";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { ClearCacheButton } from "../ClearCacheButton";
import { LinkManager } from "../LinkManager";
import { LinkListManagerProps } from "./LinkListManager.d";
import styles from './LinkListManager.module.scss';

const CanView = hasPermission("links.view");
const CanEdit = hasPermission("links.update");
const CanDelete = hasPermission("links.delete");
const CanCreate = hasPermission("links.create");

export const LinkListManagerComponent = overridable(({
    lists, isLoading,
    name, setName, listKey, setListKey,
    create, update, remove,
    selectedList, setSelectedList,
    selectedRowKeys, setSelectedRowKeys,
    conflictState,
    onExport, onImportFile,
    resolveConflict, cancelConflict,
    classes = styles
}: LinkListManagerProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newKeyInput, setNewKeyInput] = useState("");
    const [keyError, setKeyError] = useState("");

    const currentConflict = conflictState ? conflictState.conflicts[conflictState.currentIndex] : null;

    useEffect(() => {
        if (currentConflict) {
            let suggested = `${currentConflict.incoming.key}-copy`;
            let counter = 1;
            while (lists.some(l => l.key === suggested)) {
                counter++;
                suggested = `${currentConflict.incoming.key}-copy-${counter}`;
            }
            setNewKeyInput(suggested);
            setKeyError("");
        }
    }, [conflictState?.currentIndex, currentConflict?.incoming?.key, lists]);

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

    const handleSetNewKey = () => {
        const trimmed = newKeyInput.trim();
        if (!trimmed) {
            setKeyError("Please enter a valid key.");
            return;
        }
        if (trimmed === currentConflict?.incoming.key) {
            setKeyError("The new key must be different from the conflicting key. Choose 'Overwrite' if you want to replace it.");
            return;
        }
        if (lists.some(l => l.key === trimmed)) {
            setKeyError(`A link list with key "${trimmed}" already exists in the database.`);
            return;
        }
        if (conflictState?.nonConflicts.some(item => item.key === trimmed)) {
            setKeyError(`A link list with key "${trimmed}" is already queued for import.`);
            return;
        }
        if (conflictState?.resolutions.some(r => r.newKey === trimmed)) {
            setKeyError(`A link list with key "${trimmed}" was already assigned to another conflict in this batch.`);
            return;
        }
        setKeyError("");
        resolveConflict("rename", trimmed);
    };

    return (
        <Spin spinning={isLoading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
                <h1 style={{ margin: 0 }}><FontAwesomeIcon icon={faLink} /> Link Lists</h1>
                <ClearCacheButton entity="links" cacheType="linkList,link" />
            </div>

            <Row gutter={8}>
                <Col xs={6}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <Button onClick={handleImportClick} style={{ flex: 1 }}>
                            <FontAwesomeIcon icon={faFileImport} /> Import
                        </Button>
                        <Button onClick={onExport} disabled={lists.length === 0} style={{ flex: 1 }}>
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#161b22', border: '1px solid #30363d', borderRadius: 6, marginBottom: 8 }}>
                        <Checkbox 
                            checked={lists.length > 0 && selectedRowKeys.length === lists.length}
                            indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < lists.length}
                            onChange={e => {
                                if (e.target.checked) {
                                    setSelectedRowKeys(lists.map(l => l.id));
                                } else {
                                    setSelectedRowKeys([]);
                                }
                            }}
                        >
                            <span style={{ fontSize: 13, color: '#f0f6fc', fontWeight: 500 }}>
                                Select All ({selectedRowKeys.length}/{lists.length})
                            </span>
                        </Checkbox>
                    </div>

                    <ul className={classes.linkList}>
                        {lists.map(list => <li className={clsx([classes.linkListItem, selectedList === list.id && classes.selected])} key={list.id}>
                            <Checkbox
                                checked={selectedRowKeys.includes(list.id)}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setSelectedRowKeys([...selectedRowKeys, list.id]);
                                    } else {
                                        setSelectedRowKeys(selectedRowKeys.filter(k => k !== list.id));
                                    }
                                }}
                                style={{ flexGrow: 0, flexShrink: 0, marginRight: 8 }}
                            />
                            <CanEdit yes><Editable value={list.name} onChange={update(list.id, "name")} /></CanEdit>
                            <CanEdit yes><Editable value={list.key} onChange={update(list.id, "key")} /></CanEdit>
                            <CanEdit no>{list.name}</CanEdit>
                            <div className={classes.btns}>
                                <Button type="link" onClick={() => setSelectedList(list.id)}>links <FontAwesomeIcon icon={faArrowRight} /></Button>
                                <CanDelete yes><DeleteBtn entityType="link list" onClick={remove(list.id)} /></CanDelete>
                            </div>
                        </li>)}
                    </ul>
                    <CanCreate yes>
                        <Card size="small"
                            className={classes.newLinkListForm}
                            title={<>New Link List</>}
                            extra={<Button onClick={create} size="small" variant="link"><FontAwesomeIcon icon={faAdd} /> Create</Button>}
                        >
                            <Input value={name} onChange={onInputChange(setName)} placeholder="Name" />
                            <Input value={listKey} onChange={onInputChange(setListKey)} placeholder="Key" />
                        </Card>
                    </CanCreate>
                </Col>
                <Col xs={12}>
                    <CanView yes>
                        {lists.find(g => g.id === selectedList) &&
                            <LinkManager list={lists.find(l => l.id === selectedList) as ILinkList} />
                        }
                    </CanView>
                    <CanView no>
                        <Alert type="warning" message="You don't have permission to view links." />
                    </CanView>
                </Col>
            </Row>

            {conflictState && currentConflict && (
                <Modal
                    open={true}
                    onCancel={cancelConflict}
                    destroyOnClose
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#f0f6fc' }}>
                            <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#faad14" }} />
                            <span>
                                Resolve Link List Key Conflict ({conflictState.currentIndex + 1} of {conflictState.conflicts.length})
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
                            A link list with key <code style={{ background: '#0d1117', color: '#79c0ff', border: '1px solid #30363d', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>{currentConflict.incoming.key}</code> already exists in the system.
                            Choose whether to overwrite the existing link list and its child links, skip it, or set a new key:
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        {/* Existing List Card */}
                        <Card 
                            size="small" 
                            title={<span style={{ color: "#ff7875", fontWeight: 600 }}>Existing Link List (In Database)</span>}
                            style={{ background: "#21262d", border: "1px solid #da3633", borderRadius: 8 }}
                            headStyle={{ borderBottom: "1px solid #30363d", background: "rgba(218, 54, 51, 0.15)" }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#e6edf3' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Name:</span>
                                    <span style={{ color: '#f0f6fc', fontWeight: 500 }}>
                                        {currentConflict.existing.name || <em style={{ color: '#6e7681' }}>(No Name)</em>}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Key:</span>
                                    <code style={{ background: '#0d1117', color: '#ff7875', border: '1px solid #30363d', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}>
                                        {currentConflict.existing.key}
                                    </code>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Child Links:</span>
                                    <span style={{ color: '#f0f6fc', fontWeight: 500 }}>
                                        {currentConflict.existing.links?.length || 0} link(s)
                                    </span>
                                </div>
                                <div>
                                    <div style={{ color: '#8b949e', fontWeight: 600, marginBottom: 6 }}>Links Preview:</div>
                                    <div style={{ 
                                        height: 180, 
                                        overflowY: 'auto', 
                                        background: '#0d1117', 
                                        color: '#e6edf3', 
                                        border: '1px solid #30363d', 
                                        padding: '8px 12px', 
                                        borderRadius: 6, 
                                        fontSize: 12, 
                                        lineHeight: 1.6,
                                        fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    }}>
                                        {currentConflict.existing.links && currentConflict.existing.links.length > 0 ? (
                                            currentConflict.existing.links.map((link, idx) => (
                                                <div key={link.id || idx} style={{ borderBottom: '1px dashed #21262d', paddingBottom: 2, marginBottom: 2 }}>
                                                    <span style={{ color: '#79c0ff' }}>#{link.order ?? idx + 1}</span>{' '}
                                                    <strong style={{ color: '#f0f6fc' }}>{link.text}</strong>{' '}
                                                    <span style={{ color: '#8b949e' }}>&rarr; {link.url}</span>
                                                    {link.subMenuKey && <span style={{ color: '#d29922', marginLeft: 6 }}>[{link.subMenuKey}]</span>}
                                                </div>
                                            ))
                                        ) : (
                                            <em style={{ color: '#6e7681' }}>(No child links)</em>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Incoming List Card */}
                        <Card 
                            size="small" 
                            title={<span style={{ color: "#58a6ff", fontWeight: 600 }}>Incoming Link List (From File)</span>}
                            style={{ background: "#21262d", border: "1px solid #1f6feb", borderRadius: 8 }}
                            headStyle={{ borderBottom: "1px solid #30363d", background: "rgba(31, 111, 235, 0.15)" }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#e6edf3' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Name:</span>
                                    <span style={{ color: '#f0f6fc', fontWeight: 500 }}>
                                        {currentConflict.incoming.name || <em style={{ color: '#6e7681' }}>(No Name)</em>}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Key:</span>
                                    <code style={{ background: '#0d1117', color: '#58a6ff', border: '1px solid #30363d', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}>
                                        {currentConflict.incoming.key}
                                    </code>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#8b949e', fontWeight: 600, minWidth: 95 }}>Child Links:</span>
                                    <span style={{ color: '#f0f6fc', fontWeight: 500 }}>
                                        {currentConflict.incoming.links?.length || 0} link(s)
                                    </span>
                                </div>
                                <div>
                                    <div style={{ color: '#8b949e', fontWeight: 600, marginBottom: 6 }}>Links Preview:</div>
                                    <div style={{ 
                                        height: 180, 
                                        overflowY: 'auto', 
                                        background: '#0d1117', 
                                        color: '#e6edf3', 
                                        border: '1px solid #30363d', 
                                        padding: '8px 12px', 
                                        borderRadius: 6, 
                                        fontSize: 12, 
                                        lineHeight: 1.6,
                                        fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    }}>
                                        {currentConflict.incoming.links && currentConflict.incoming.links.length > 0 ? (
                                            currentConflict.incoming.links.map((link, idx) => (
                                                <div key={idx} style={{ borderBottom: '1px dashed #21262d', paddingBottom: 2, marginBottom: 2 }}>
                                                    <span style={{ color: '#79c0ff' }}>#{link.order ?? idx + 1}</span>{' '}
                                                    <strong style={{ color: '#f0f6fc' }}>{link.text}</strong>{' '}
                                                    <span style={{ color: '#8b949e' }}>&rarr; {link.url}</span>
                                                    {link.subMenuKey && <span style={{ color: '#d29922', marginLeft: 6 }}>[{link.subMenuKey}]</span>}
                                                </div>
                                            ))
                                        ) : (
                                            <em style={{ color: '#6e7681' }}>(No child links)</em>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Set New Key Panel */}
                    <div style={{
                        background: '#161b22',
                        border: '1px solid #30363d',
                        borderRadius: 8,
                        padding: '12px 16px',
                        marginBottom: 16
                    }}>
                        <div style={{ color: '#f0f6fc', fontWeight: 600, fontSize: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#58a6ff' }} />
                            <span>Option: Keep both by setting a new key for the incoming link list</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <Input 
                                value={newKeyInput} 
                                onChange={e => {
                                    setNewKeyInput(e.target.value);
                                    if (keyError) setKeyError("");
                                }}
                                onPressEnter={handleSetNewKey}
                                placeholder="Enter unique key" 
                                style={{ 
                                    background: '#0d1117', 
                                    color: '#f0f6fc', 
                                    borderColor: keyError ? '#ff4d4f' : '#30363d',
                                    fontFamily: 'monospace',
                                    flex: 1
                                }}
                            />
                            <Button 
                                type="primary"
                                onClick={handleSetNewKey}
                                disabled={!newKeyInput.trim() || newKeyInput.trim() === currentConflict.incoming.key}
                                style={{ backgroundColor: '#1f6feb', borderColor: '#1f6feb' }}
                            >
                                <FontAwesomeIcon icon={faTag} style={{ marginRight: 6 }} /> Set New Key &amp; Create
                            </Button>
                        </div>
                        {keyError && (
                            <div style={{ color: '#ff7875', fontSize: 12, marginTop: 6, fontWeight: 500 }}>
                                {keyError}
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </Spin>
    );
});

