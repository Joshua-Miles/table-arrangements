import { createWorkspaceEvent } from "./createWorkspaceEvent"
import { Events } from "./Event"
import { Attendees } from "./Attendee"
import { Tables } from "./Table"
import { EventDetails } from "./EventDetails"
import { FixtureTemplates } from "./FixtureTemplate"
import { Fixtures } from "./Fixture"

import { listWorkspaceEvents } from "./listWorkspaceEvents"
import { getEventDetails } from "./getEventDetails"
import { updateEventDetails } from "./updateEventDetails"
import { createEventTag } from "./createEventTag"
import { createEventFixtureTemplate } from "./createEventFixtureTemplate"
import { createEventFixture } from "./createEventFixture"



export const PublicEventInterface = {
    EventDetailsType: EventDetails.type,
    EventType: Events.type,
    AttendeeType: Attendees.type,
    TableType: Tables.type,
    FixtureTemplateType: FixtureTemplates.type,
    FixtureType: Fixtures.type,

    createWorkspaceEvent,
    listWorkspaceEvents,
    getEventDetails,
    updateEventDetails,
    createEventTag,
    createEventFixtureTemplate,
    createEventFixture,
}
