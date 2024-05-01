import { createWorkspaceEvent } from "./createWorkspaceEvent"
import { Events } from "./Event"
import { getEvent } from "./getEvent"
import { listWorkspaceEvents } from "./listWorkspaceEvents"
import { listEventAttendees } from "./listEventAttendees"
import { listEventTables } from "./listEventTables"
import { createEventAttendee } from "./createEventAttendee"
import { updateEventAttendee } from "./updateEventAttendee"
import { Attendees } from "./Attendee"
import { Tables } from "./Table"


export const PublicEventInterface = {
    createWorkspaceEvent,
    listWorkspaceEvents,
    getEvent,
    listEventAttendees,
    listEventTables,
    createEventAttendee,
    updateEventAttendee,
    EventType: Events.type,
    AttendeeType: Attendees.type,
    TableType: Tables.type
}
