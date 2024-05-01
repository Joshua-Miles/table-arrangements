import { Client } from "@triframe/proprietor";
import { makeFailure, SetFields } from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Attendees } from "./Attendee";



export async function updateEventAttendee(client: Client<Session>, eventId: number, attendeeId: number, fields: SetFields<typeof Attendees>) {
    const { loggedInUserId } = await client.getSession();

    const authorizationFailure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (authorizationFailure) return authorizationFailure;

    return await Attendees.withEventId(eventId).withId(attendeeId).set(() => fields)
}