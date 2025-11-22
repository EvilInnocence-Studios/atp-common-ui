import { ITagGroup } from "@common-shared/tag/types";

export declare interface ITagGroupManagerProps {
    groups: ITagGroup[];
    isLoading: boolean;
    name: string;
    setName: Setter<string>;
    selectedGroup: string | null;
    setSelectedGroup: Setter<string>;
    create: () => void;
    update: (id: string, field: string) => (value: any) => void;
    remove: (id: string) => () => void;
    sortGroups: (id: string, newIndex: number) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ITagGroupManagerInputProps {
    classes?: any;
}

export type TagGroupManagerProps = ITagGroupManagerInputProps & ITagGroupManagerProps;