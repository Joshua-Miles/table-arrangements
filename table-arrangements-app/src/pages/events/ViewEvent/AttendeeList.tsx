import { Box, BoxProps, Card, CardBody, Input, VStack, Tag, Flex } from "@chakra-ui/react";
import { isLoading, usePagination } from "@triframe/utils-react";
import { from, isAnyFailure } from '@triframe/ambassador';
import { AttendeeType, createEventAttendee, listEventAttendees } from '../../../api'
import { KeyboardEvent, useState } from "react";
import { AttendeeCard, attendeeFields } from "./AttendeeCard";

type AttendeeListProps = BoxProps & {
    eventId: number
}

export function AttendeeList({ eventId, ...boxProps }: AttendeeListProps) {
    const pagination = usePagination(10);

    const attendees = pagination.useResult(listEventAttendees, eventId, {
        select: attendeeFields,
        tableId: null
    })

    const [ newAttendeeName, setNewAttendeeName ] = useState('');

    async function handleKeydown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setNewAttendeeName('')
            await createEventAttendee(eventId, { name: newAttendeeName });
        }
    }

    if (isLoading(attendees) || isAnyFailure(attendees)) return null;

    return (
        <Card {...boxProps} padding={2}>
            <Input placeholder="Enter Attendee Name" value={newAttendeeName} onChange={e => setNewAttendeeName(e.target.value)} onKeyDown={handleKeydown} />
            <VStack align="stretch">
                {attendees.map( attendee => (
                    <AttendeeCard attendee={attendee} />
                ))}
            </VStack>
        </Card>
    )
}