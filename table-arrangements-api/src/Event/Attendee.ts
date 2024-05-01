import { persist, Serial } from "@triframe/scribe";

export type Attendee = {
    id: Serial
    eventId: number
    partyId: number | null
    tableId: number | null
    seatNumber: number | null
    name: string
}

export const Attendees = persist<Attendee>()
    .primaryKey('id')
    .indexBy('eventId')
    .indexBy('partyId')
    .indexBy('tableId');
