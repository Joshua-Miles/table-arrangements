import { persist, Serial } from "@triframe/scribe";

export type Table = {
    id: Serial
    eventId: number
    label: string
    orderby: number
    capacity: number
    fixtureId: number | null
}

export const Tables = persist<Table>()
    .primaryKey('id')
    .indexBy('eventId')
    .defaults({
        fixtureId: null
    });
