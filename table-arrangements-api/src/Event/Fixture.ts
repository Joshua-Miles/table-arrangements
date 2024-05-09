import { persist, Serial } from "@triframe/scribe"

type Fixture = {
    id: Serial
    eventId: number
    templateId: number
    x: number
    y: number
}

export const Fixtures = persist<Fixture>()
    .primaryKey('id')
    .indexBy('eventId');
