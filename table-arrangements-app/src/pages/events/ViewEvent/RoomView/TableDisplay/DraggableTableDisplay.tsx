import { useDraggable } from "@dnd-kit/core";
import { TableDisplay, TableDisplayProps } from "./TableDisplay";

export function DraggableTableDisplay(props: TableDisplayProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `table-${props.table.id}`,
        data: {
            type: 'table',
            table: { ...props.table, x: null, y: null }
        }
    });

    return  <TableDisplay visibility={isDragging ? 'hidden' : 'visible'} {...props} {...listeners} {...attributes} ref={setNodeRef}/>
}