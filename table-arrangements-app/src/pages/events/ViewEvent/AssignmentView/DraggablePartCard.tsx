import { useDraggable } from "@dnd-kit/core";
import { PartyCard, PartyCardProps } from "./PartyCard";

export function DraggablePartyCard(props: PartyCardProps) {
    const party = props.party;
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `party-${party.id}`,
        data:  {
            party
        }
    });

    return  <PartyCard visibility={isDragging ? 'hidden' : 'visible'} {...props} {...listeners} {...attributes} ref={setNodeRef}/>
}
