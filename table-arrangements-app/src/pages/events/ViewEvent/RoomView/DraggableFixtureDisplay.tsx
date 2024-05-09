import { useDraggable } from "@dnd-kit/core";
import { FixtureDisplay, FixtureDisplayProps } from "./FixtureDisplay";

export function DraggableFixtureDisplay(props: FixtureDisplayProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `${props.fixtureId ? 'fixture' : 'table'}-${props.fixtureId ?? props.tableId}`,
        data: { ...props, x: undefined, y: undefined }
    });

    return  <FixtureDisplay visibility={isDragging ? 'hidden' : 'visible'} {...props} {...listeners} {...attributes} ref={setNodeRef}/>
}