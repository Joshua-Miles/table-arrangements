import { useDraggable } from "@dnd-kit/core";
import { useEventEditor } from "../../EventEditor";
import { TableDisplay, TableDisplayProps } from "./TableDisplay";

export function DraggableTableDisplay(props: TableDisplayProps) {
    const editor = useEventEditor();
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `table-${props.table.id}`,
        disabled: editor.isDisabled,
        data: {
            type: 'table',
            table: { ...props.table, x: null, y: null }
        }
    });

    return  <TableDisplay cursor={editor.isDisabled ? 'initial' : 'pointer'} visibility={isDragging ? 'hidden' : 'visible'} {...props} {...listeners} {...attributes} ref={setNodeRef}/>
}