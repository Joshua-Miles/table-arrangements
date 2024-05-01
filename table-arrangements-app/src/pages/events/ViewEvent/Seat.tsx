import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { listEventAttendees } from "../../../api";
import { AttendeeCard, attendeeFields } from "./AttendeeCard";

export type SeatProps = {
    eventId: number
    tableId: number
    seatNumber: number
}

export function Seat({ eventId, tableId, seatNumber }: SeatProps) {
    const tableAttendees = useResult(listEventAttendees, eventId, {
        select: attendeeFields,
        tableId
    })

    const { setNodeRef } = useDroppable({
        id: `seat-${tableId}-${seatNumber}`,
        data: {
            tableId,
            seatNumber
        },
    });

    const attendee = (isLoading(tableAttendees) || isAnyFailure(tableAttendees)) ? null : tableAttendees.find(attendee => attendee.seatNumber == seatNumber) ?? null;

    return (
        <Box ref={setNodeRef} width="100%">
            {seatNumber}. { attendee !== null ? <AttendeeCard attendee={attendee}/> : 'Unassigned'}
        </Box>
    )
}