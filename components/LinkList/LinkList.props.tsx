import { ILinkList } from "@common-shared/link/types";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { faAdd, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { LinkManager } from "../LinkManager";
import { ILinkListInputProps } from "./LinkList.d";

const InternalLinkListPropEditor = ({ id, updateProp }: { id: string, updateProp: (prop: string) => (value: any) => void }) => {
    const [lists, setLists] = useState<ILinkList[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState("");
    const [newKey, setNewKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loadLists = () => {
        services().linkList.search().then(setLists);
    };

    useEffect(() => {
        loadLists();
    }, []);

    const selectedList = lists.find(l => l.key === id);

    const handleCreate = async () => {
        if (!newName || !newKey) {
            flash.error("Name and key are required");
            return;
        }
        setIsLoading(true);
        try {
            await services().linkList.create({ name: newName, key: newKey });
            await loadLists();
            updateProp("id")(newKey);
            setIsCreating(false);
            setNewName("");
            setNewKey("");
            flash.success("List created");
        } catch (e: any) {
            flash.error(e.message || "Failed to create list");
        }
        setIsLoading(false);
    };

    return <>
        {!isCreating ? (
            <Space direction="vertical" style={{ width: "100%" }}>
                <Select 
                    style={{ width: "100%" }}
                    value={id || null} 
                    onChange={val => updateProp("id")(val)}
                    options={[
                        { value: null, label: "-- Select a List --" },
                        ...lists.map(l => ({ value: l.key, label: l.name }))
                    ]}
                />
                <Button type="dashed" block onClick={() => setIsCreating(true)}>
                    <FontAwesomeIcon icon={faAdd} /> Create New List
                </Button>
            </Space>
        ) : (
            <Space direction="vertical" style={{ width: "100%" }}>
                <Input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
                <Input placeholder="Key" value={newKey} onChange={e => setNewKey(e.target.value)} />
                <Space>
                    <Button type="primary" onClick={handleCreate} loading={isLoading}>
                        <FontAwesomeIcon icon={faCheck} /> Save
                    </Button>
                    <Button onClick={() => setIsCreating(false)}>
                        <FontAwesomeIcon icon={faTimes} /> Cancel
                    </Button>
                </Space>
            </Space>
        )}
        {selectedList && (
            <>
                <Divider />
                <LinkManager list={selectedList} multiLine />
            </>
        )}
    </>;
};

export const LinkListPropEditor = (
    { id }: ILinkListInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => <InternalLinkListPropEditor id={id} updateProp={updateProp} />;
