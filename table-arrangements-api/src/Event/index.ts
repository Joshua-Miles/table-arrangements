import { createOrganizationEvent } from "./createOrganizationEvent"
import { Events } from "./Event"
import { Attendees } from "./Attendee"
import { Tables } from "./Table"
import { EventDetails } from "./EventDetails"
import { Fixtures } from "./Fixture"

import { listOrganizationEvents } from "./listOrganizationEvents"
import { getEventDetails } from "./getEventDetails"
import { updateEventDetails } from "./updateEventDetails"
import { createEventTag } from "./createEventTag"
import { listEventObjectTemplates } from "./listEventObjectTemplates"
import { ObjectTemplates } from "../Organization"


export const PublicEventInterface = {
    EventDetailsType: EventDetails.type,
    EventType: Events.type,
    AttendeeType: Attendees.type,
    TableType: Tables.type,
    FixtureType: Fixtures.type,
    ObjectTemplateType: ObjectTemplates.type,

    createOrganizationEvent,
    listOrganizationEvents,
    getEventDetails,
    updateEventDetails,
    createEventTag,
    listEventObjectTemplates
}
