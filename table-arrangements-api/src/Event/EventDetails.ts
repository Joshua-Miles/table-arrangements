import { AssociationRemovalStrategies } from "@triframe/scribe";
import { Attendees } from "./Attendee";
import { Events } from "./Event";
import { Fixtures } from "./Fixture";
import { FixtureTemplates } from "./FixtureTemplate";
import { Parties } from "./Party";
import { Tables } from "./Table";
import { Tags } from "./Tags";

export const EventDetails = Events.map( event => ({
    ...event,
    tables: Tables.withEventId(event.id)
        .omit('eventId')
        .strategyForAssociationRemoval(AssociationRemovalStrategies.Delete),
    tags: Tags.withEventId(event.id)
        .omit('eventId')
        .strategyForAssociationRemoval(AssociationRemovalStrategies.Delete),
    fixtureTemplates: FixtureTemplates.withEventId(event.id)
        .omit('eventId')
        .strategyForAssociationRemoval(AssociationRemovalStrategies.Delete),
    fixtures: Fixtures.withEventId(event.id)
        .omit('eventId')
        .strategyForAssociationRemoval(AssociationRemovalStrategies.Delete),
    parties: Parties.withEventId(event.id)
        .omit('eventId')
        .map( party => ({
            ...party,
            attendees: Attendees.withPartyId(party.id)
                .omit('partyId')
                .strategyForAssociationRemoval(AssociationRemovalStrategies.Delete),
        }))
        .strategyForAssociationRemoval(AssociationRemovalStrategies.Delete)
}))
