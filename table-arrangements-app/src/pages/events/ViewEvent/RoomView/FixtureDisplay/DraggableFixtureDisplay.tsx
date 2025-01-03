import { useDraggable } from "@dnd-kit/core";
import { useEventEditor } from "../../../_shared/EventEditor";
import { FixtureDisplay, FixtureDisplayProps } from "./FixtureDisplay";

export function DraggableFixtureDisplay(props: FixtureDisplayProps) {
    const editor = useEventEditor();

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `fixture-${props.fixture.id}`,
        disabled: editor.isDisabled,
        data: {
            type: 'fixture',
            fixture: { ...props.fixture, x: undefined, y: undefined }
        }
    });

    return  <FixtureDisplay visibility={isDragging ? 'hidden' : 'visible'} {...props} {...listeners} {...attributes} ref={setNodeRef}/>
}