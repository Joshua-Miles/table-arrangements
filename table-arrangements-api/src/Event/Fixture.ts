import { persist, Serial } from "@triframe/scribe"

type Fixture =  {
    id: Serial
    eventId: number
    label: string
    shape: 'round' | 'rectangle'
    color: string
    length: number
    width: number
    x: number
    y: number
    zIndex: number | null
}

export const Fixtures = persist<Fixture>()
    .primaryKey('id')
    .indexBy('eventId');
