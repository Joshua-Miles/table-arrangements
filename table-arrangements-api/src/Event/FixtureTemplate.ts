import { persist, Serial } from "@triframe/scribe"
import { convert } from "./UnitOfMeasure";

type FixtureTemplate = {
    id: Serial
    eventId: number
    label: string
    shape: 'round' | 'rectangle'
    color: string
    width: number
    length: number
}

export const FixtureTemplates = persist<FixtureTemplate>()
    .primaryKey('id')
    .indexBy('eventId');

export async function createDefaultFixtureTemplates(eventId: number) {
    await FixtureTemplates.appendMany([
        { eventId, label: '{length} x {width} Table', shape: 'rectangle', color: '#000000', width: convert(30, 'inches').toBase(), length: convert(8, 'feet').toBase() },
        { eventId, label: '{length} x {width} Table', shape: 'rectangle', color: '#000000', width: convert(30, 'inches').toBase(), length: convert(6, 'feet').toBase() },
        { eventId, label: '{length} Round', shape: 'rectangle', color: '#000000', width: convert(10, 'feet').toBase(), length: convert(10, 'feet').toBase() },
        { eventId, label: '{length} Round', shape: 'rectangle', color: '#000000', width: convert(6, 'feet').toBase(), length: convert(6, 'feet').toBase() },
        { eventId, label: '{length} Round', shape: 'rectangle', color: '#000000', width: convert(5.5, 'feet').toBase(), length: convert(5.5, 'feet').toBase() }
    ])
}
