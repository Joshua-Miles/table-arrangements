import { persist, Serial } from "@triframe/scribe";

export type Table = {
    id: Serial
    eventId: number
    number: number
    label: string | null
    orderby: number
    capacity: number
    shape: 'round' | 'rectangle' | null
    color: string | null
    length: number | null
    width: number | null
    x: number | null
    y: number | null
    zIndex: number | null
}

export const Tables = persist<Table>()
    .primaryKey('id')
    .indexBy('eventId');
