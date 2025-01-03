import { persist, Serial } from "@triframe/scribe";

export type Event = {
    id: Serial
    organizationId: number
    name: string
    roomWidth: number | null
    roomLength: number | null
    defaultTableObjectTemplateId: number | null
    isPublicRegistrationEnabled: boolean
    publicRegistrationKey: string
}

export const Events = persist<Event>()
    .primaryKey('id')
    .indexBy('organizationId');
