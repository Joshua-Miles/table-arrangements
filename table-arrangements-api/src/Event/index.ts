import { createWorkspaceEvent } from "./createWorkspaceEvent"
import { Events } from "./Event"
import { Attendees } from "./Attendee"
import { Tables } from "./Table"
import { EventDetails } from "./EventDetails"
import { Fixtures } from "./Fixture"

import { listWorkspaceEvents } from "./listWorkspaceEvents"
import { getEventDetails } from "./getEventDetails"
import { updateEventDetails } from "./updateEventDetails"
import { createEventTag } from "./createEventTag"
import { listEventObjectTemplates } from "./listEventObjectTemplates"
import { ObjectTemplates } from "../Workspace"


export const PublicEventInterface = {
    EventDetailsType: EventDetails.type,
    EventType: Events.type,
    AttendeeType: Attendees.type,
    TableType: Tables.type,
    FixtureType: Fixtures.type,
    ObjectTemplateType: ObjectTemplates.type,

    createWorkspaceEvent,
    listWorkspaceEvents,
    getEventDetails,
    updateEventDetails,
    createEventTag,
    listEventObjectTemplates
}
