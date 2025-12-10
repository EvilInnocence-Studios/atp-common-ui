import { ILayoutComponent, ITheme } from "@core/lib/layout/layout";

export declare interface ILayoutManagerProps {
    layout: ILayoutComponent | null;
    selectedId: string | null;
    selectComponent: (id: string | null) => void;
    addComponent: (parentId: string, slotName: string, component: ILayoutComponent, index?: number) => void;
    removeComponent: (id: string) => void;
    updateComponent: (id: string, updates: Partial<ILayoutComponent>) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ILayoutManagerInputProps {
    classes?: any;
    layout: ILayoutComponent | null;
}

export type LayoutManagerProps = ILayoutManagerInputProps & ILayoutManagerProps;