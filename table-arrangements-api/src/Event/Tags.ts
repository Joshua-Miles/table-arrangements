import { persist, Serial } from "@triframe/scribe";

type Tag = {
    id: Serial
    eventId: number
    label: string
    color: string
}

export const Tags = persist<Tag>()
    .primaryKey('id')
    .indexBy('eventId');
