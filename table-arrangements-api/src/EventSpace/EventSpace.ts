import { persist, Serial } from "@triframe/scribe";

export type EventSpace = {
    id: Serial
    name: string
    width: number
    height: number
}

export const EventSpaces = persist<EventSpace>()
    .primaryKey('id');
