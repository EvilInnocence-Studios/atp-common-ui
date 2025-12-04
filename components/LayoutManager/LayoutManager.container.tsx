import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ILayoutComponent } from "@core/lib/layout/layout";
import { addComponent, ensureIds, removeComponent, updateComponent, findComponent, findParent } from "@core/lib/layout/utils";
import { overridable } from "@core/lib/overridable";
import { useCallback, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { LayoutManagerComponent } from "./LayoutManager.component";
import { ILayoutManagerInputProps, ILayoutManagerProps, LayoutManagerProps } from "./LayoutManager.d";
import { LayoutManagerContext, useLayoutManager } from "@core/lib/layout/context";

export const LayoutManagerProvider = ({ children, initialLayout }: { children: React.ReactNode, initialLayout: ILayoutComponent | null }) => {
    const [layout, setLayout] = useState<ILayoutComponent | null>(initialLayout ? ensureIds(initialLayout) : null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleAddComponent = useCallback((parentId: string, slotName: string, component: ILayoutComponent, index?: number) => {
        setLayout(prev => prev ? addComponent(prev, parentId, slotName, ensureIds(component), index) : null);
    }, []);

    const handleRemoveComponent = useCallback((id: string) => {
        setLayout(prev => prev ? removeComponent(prev, id) : null);
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    const handleUpdateComponent = useCallback((id: string, updates: Partial<ILayoutComponent>) => {
        setLayout(prev => prev ? updateComponent(prev, id, updates) : null);
    }, []);

    const handleDragEnd = useCallback((event: any) => {
        const { active, over } = event;
        if (!over) return;

        if (over.id === 'root-layout') {
            const componentDef = active.data.current?.component;
            if (componentDef) {
                setLayout(ensureIds({ component: componentDef.name }));
            }
            return;
        }

        if (active.id !== over.id) {
            // If dropping palette item into a slot
            if (active.id.toString().startsWith('palette-')) {
                 const componentDef = active.data.current?.component;
                 const { parentId, slotName } = over.data.current || {};
                 if (componentDef && parentId && slotName) {
                     handleAddComponent(parentId, slotName, { component: componentDef.name });
                 }
            } else {
                // Moving existing component
                setLayout(prev => {
                    if (!prev) return null;
                    const movedId = active.id;
                    const component = findComponent(prev, movedId);
                    if (!component) return prev;

                    // Remove from old location
                    const tempLayout = removeComponent(prev, movedId);
                    if (!tempLayout) return prev;

                    let targetParentId: string | undefined;
                    let targetSlot: string | undefined;
                    let targetIndex: number | undefined;

                    // Case 1: Dropped on a Slot (container)
                    if (over.data.current && over.data.current.parentId && over.data.current.slotName) {
                        targetParentId = over.data.current.parentId;
                        targetSlot = over.data.current.slotName;
                        // Append to end
                    } 
                    // Case 2: Dropped on another Component
                    else {
                        // We need to find the parent of the 'over' item in the NEW layout (after removal)
                        // to get the correct index.
                        const parentInfo = findParent(tempLayout, over.id);
                        if (parentInfo) {
                            targetParentId = parentInfo.parent.id;
                            targetSlot = parentInfo.slotName;
                            targetIndex = parentInfo.index;
                        }
                    }

                    if (targetParentId && targetSlot) {
                        return addComponent(tempLayout, targetParentId, targetSlot, component, targetIndex);
                    }

                    return prev; // Fallback if target not found
                });
            }
        }
    }, [handleAddComponent]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    return <LayoutManagerContext.Provider value={{
        layout,
        selectedId,
        selectComponent: (id: string | null) => {
            console.log('Selecting component', id);
            setSelectedId(id)
        },
        addComponent: handleAddComponent,
        removeComponent: handleRemoveComponent,
        updateComponent: handleUpdateComponent
    }}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            {children}
        </DndContext>
    </LayoutManagerContext.Provider>;
};

const injectLayoutManagerProps = createInjector(({ }: ILayoutManagerInputProps): ILayoutManagerProps => {
    const { layout, selectedId, selectComponent, addComponent, removeComponent, updateComponent } = useLayoutManager();
    return {
        layout,
        selectedId,
        selectComponent,
        addComponent,
        removeComponent,
        updateComponent
    };
});

const connect = inject<ILayoutManagerInputProps, LayoutManagerProps>(mergeProps(
    injectLayoutManagerProps,
));

const ConnectedLayoutManager = connect(LayoutManagerComponent);

export const LayoutManager = overridable<ILayoutManagerInputProps>((props) => 
    <LayoutManagerProvider initialLayout={props.layout}>
        <ConnectedLayoutManager {...props} />
    </LayoutManagerProvider>
);
