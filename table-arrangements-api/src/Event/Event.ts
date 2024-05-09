import { persist, Serial } from "@triframe/scribe";

export type Event = {
    id: Serial
    workspaceId: number
    name: string
    roomWidth: number | null
    roomLength: number | null
    defaultTableObjectTemplateId: number | null
}

export const Events = persist<Event>()
    .primaryKey('id')
    .indexBy('workspaceId');
