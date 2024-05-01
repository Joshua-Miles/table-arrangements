import { Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateEventAttendee } from "../../../api";
import { Attendee, AttendeeCard } from "./AttendeeCard";
import { AttendeeList } from "./AttendeeList";
import { TableArea } from "./TableArea";

export function ViewEvent () {
    const params = useParams();

    const eventId = Number(params.eventId);

    const [ draggedAttendee, setDraggedAttendee ] = useState<Attendee | null>(null);

    function handleDragStart(e: DragStartEvent) {
       const attendee = e.active.data.current?.attendee as Attendee
       setDraggedAttendee(attendee);
    }

    async function handleDragEnd(e: DragEndEvent) {
        if (!e.over || !draggedAttendee) return;
        const tableId = e.over.data.current?.tableId as number;
        const seatNumber = e.over.data.current?.seatNumber as number;
        await updateEventAttendee(eventId, draggedAttendee.id, { tableId, seatNumber })
    }

    return (
        <Flex height="100%">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <AttendeeList eventId={eventId} width="25vw"/>
                <TableArea eventId={eventId} flex={1} />
                <DragOverlay>
                    {draggedAttendee !== null && <AttendeeCard attendee={draggedAttendee} /> }
                </DragOverlay>
            </DndContext>
        </Flex>
    )
}
