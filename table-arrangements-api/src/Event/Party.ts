import { persist, Serial } from "@triframe/scribe";

export type Party = {
    id: Serial
    eventId: number
    tableId: number | null
    orderby: number | null
    name: string
    color: string
}

export const Parties = persist<Party>()
    .defaults({ color: '#000000' })
    .primaryKey('id')
    .indexBy('eventId');
