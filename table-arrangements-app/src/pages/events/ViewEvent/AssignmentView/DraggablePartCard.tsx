import { useDraggable } from "@dnd-kit/core";
import { useEventEditor } from "../../_shared/EventEditor";
import { PartyCard, PartyCardProps } from "./PartyCard";

export function DraggablePartyCard(props: PartyCardProps) {
    const party = props.party;
    const editor = useEventEditor();
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `party-${party.id}`,
        disabled: editor.isDisabled,
        data:  {
            party
        }
    });

    return  <PartyCard cursor={editor.isDisabled ? 'initial' : 'pointer'} visibility={isDragging ? 'hidden' : 'visible'} {...props} {...listeners} {...attributes} ref={setNodeRef}/>
}
