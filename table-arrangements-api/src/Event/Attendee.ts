import { persist, Serial } from "@triframe/scribe";

export type Attendee = {
    id: Serial
    partyId: number
    tagId: number | null
    name: string
}

export const Attendees = persist<Attendee>()
    .primaryKey('id')
    .indexBy('partyId');
