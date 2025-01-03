import { persist, Serial } from "@triframe/scribe";

export type CustomField = {
    id: Serial
    eventId: number
    orderby: number
    scope: 'party' | 'attendee'
    name: string
    type: 'text' | 'email' | 'phone'
    prompt: string
    placeholder: string
    isRequired: boolean
}

export const CustomFields = persist<CustomField>()
    .primaryKey('id')
    .indexBy('eventId');
