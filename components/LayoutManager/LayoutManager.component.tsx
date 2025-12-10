import { ComponentRegistry } from "@core/lib/layout/componentRegistry";
import { overridable } from "@core/lib/overridable";
import { SelectableItem } from "@core/components/SlotRenderer/SlotRenderer.component";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Collapse, Row } from "antd";
import { LayoutManagerProps } from "./LayoutManager.d";
import styles from './LayoutManager.module.scss';
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { PropertyPanel } from "./PropertyPanel";

import slotStyles from "@core/components/SlotRenderer/SlotRenderer.module.scss";


const DraggablePaletteItem = ({ component, classes }: { component: any, classes: any }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `palette-${component.name}`,
        data: { component }
    });
    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={classes.component}>
            {component.icon && <img src={component.icon} />}
            {component.displayName}
        </div>
    );
};

export const LayoutManagerComponent = overridable(({layout, selectedId, selectComponent, removeComponent, classes = styles}:LayoutManagerProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'root-layout',
        disabled: !!layout,
    });

    return <div className={classes.layoutManager}>
    <h1><FontAwesomeIcon icon={faTableCells} /> LayoutManager</h1>
    <Row gutter={[16,16]}>
        <Col span={4}>
            <Collapse>
                {Array.from(ComponentRegistry.getCategories()).map((category) =>
                    <Collapse.Panel header={category} key={category}>
                        <div className={classes.componentList}>
                            {ComponentRegistry.byCategory(category).map((component) => <DraggablePaletteItem key={component.name} component={component} classes={classes} />)}
                        </div>
                    </Collapse.Panel>
                )}
            </Collapse>
        </Col>
        <Col span={16}>
            {layout ? (() => {
                const Component = ComponentRegistry.get(layout.component)?.component;
                console.log('LayoutManager rendering root', { 
                    layoutComponent: layout.component, 
                    foundComponent: !!Component,
                    isForwardRef: Component ? '$$typeof' in Component : 'unknown'
                });
                const rootContent = Component ? <Component {...layout.props} slots={layout.slots} layoutId={layout.id} /> : null;
                
                if (rootContent) {
                    return (
                        <>
                            <SelectableItem
                                id={layout.id!}
                                selected={selectedId === layout.id}
                                title={layout.component}
                                onSelect={() => selectComponent(layout.id!)}
                                onDelete={() => removeComponent(layout.id!)}
                                classes={slotStyles} // Use SlotRenderer styles for the item
                                className={slotStyles.item}
                            >
                                {rootContent}
                            </SelectableItem>
                            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                <h3>Layout JSON</h3>
                                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                                    {JSON.stringify(layout, null, 2)}
                                </pre>
                            </div>
                        </>
                    );
                }
                return null;
            })() : <div ref={setNodeRef} className={classes.rootDropTarget} style={{
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: isOver ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                Drop a component here to start
            </div>}
        </Col>
        <Col span={4}>
            <PropertyPanel />
        </Col>
    </Row>
</div>});
