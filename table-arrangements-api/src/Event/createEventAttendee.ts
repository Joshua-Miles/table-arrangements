import { Client } from "@triframe/proprietor";
import { makeFailure } from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Attendees } from "./Attendee";


type CreateEventAttendeeOptions = {
    name: string;
}

export async function createEventAttendee(client: Client<Session>, eventId: number, options: CreateEventAttendeeOptions) {
    const { loggedInUserId } = await client.getSession();

    const { name } = options;

    if (!name) return makeFailure('nameCannotBeEmpty', {});

    const authorizationFailure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (authorizationFailure) return authorizationFailure;

    return await Attendees.append({ eventId, name })
}