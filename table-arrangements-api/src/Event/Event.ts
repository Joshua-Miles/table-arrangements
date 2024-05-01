import { persist, Serial } from "@triframe/scribe";

export type Event = {
    id: Serial
    workspaceId: number
    name: string
}

export const Events = persist<Event>()
    .primaryKey('id')
    .indexBy('workspaceId');
