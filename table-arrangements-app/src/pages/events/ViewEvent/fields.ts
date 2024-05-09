import { from, OptionalSerials } from '@triframe/ambassador'
import { EventDetailsType } from "../../../api";

export const eventDetailFields = (
    from(EventDetailsType)
        .id()
        .name()
        .roomWidth()
        .roomLength()
        .defaultTableFixtureTemplateId()
        .tables( (table) => (
            table
                .id()
                .label()
                .orderby()
                .capacity()
                .fixtureId()
        ))
        .tags( tag => (
            tag
                .id()
                .color()
                .label()
        ))
        .fixtureTemplates( fixtureTemplate => (
            fixtureTemplate
                .id()
                .label()
                .color()
                .shape()
                .length()
                .width()
        ))
        .fixtures( fixture => (
            fixture
                .id()
                .templateId()
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

export type FixtureTemplate = EventDetails['fixtureTemplates'][number]

