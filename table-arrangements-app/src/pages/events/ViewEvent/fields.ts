import { from, OptionalSerials } from '@triframe/ambassador'
import { EventDetailsType, ObjectTemplateType } from "../../../api";

export const eventDetailFields = (
    from(EventDetailsType)
        .id()
        .name()
        .roomWidth()
        .roomLength()
        .workspaceId()
        .defaultTableObjectTemplateId()
        .tables( (table) => (
            table
                .id()
                .number()
                .label()
                .orderby()
                .capacity()
                .color()
                .shape()
                .width()
                .length()
                .x()
                .y()
        ))
        .tags( tag => (
            tag
                .id()
                .color()
                .label()
        ))
        .fixtures( fixture => (
            fixture
                .id()
                .label()
                .color()
                .shape()
                .width()
                .length()
                .x()
                .y()
        ))
        .parties( (party) => (
            party
                .id()
                .name()
                .color()
                .tableId()
                .orderby()
                .attendees( attendee => (
                    attendee
                        .id()
                        .name()
                        .tagId()
                ))
        ))
)

export type EventDetails = OptionalSerials<(typeof eventDetailFields)['ᑕ_subset']>;

export type Party = EventDetails['parties'][number]

export type Attendee = Party['attendees'][number]

export type Table = EventDetails['tables'][number]

export type EventTag = EventDetails['tags'][number]

export type Fixture = EventDetails['fixtures'][number]

export type PlacedTable = Table & {
    color: string
    shape: 'round' | 'rectangle'
    width: number
    length: number
    zIndex: number
    x: number
    y: number
}

export function isPlacedTable(table: Table): table is PlacedTable {
    return table.shape !== null && table.x !== null && table.y !== null
}

export const objectTemplateFields = from(ObjectTemplateType)
    .id()
    .color()
    .label()
    .shape()
    .length()
    .width()

export type ObjectTemplate = (typeof objectTemplateFields)['ᑕ_subset']
