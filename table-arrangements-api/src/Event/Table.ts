import { persist, Serial } from "@triframe/scribe";

export type Table = {
    id: Serial
    eventId: number
    label: string
    orderby: number
    capacity: number
}

export const Tables = persist<Table>()
    .primaryKey('id')
    .indexBy('eventId');
