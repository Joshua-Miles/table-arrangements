import { Client } from "@triframe/proprietor";
import { SetFields} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { EventDetails } from "./EventDetails";

export async function updateEventDetails(client: Client<Session>, eventId: number, fields: SetFields<typeof EventDetails>) {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    return await EventDetails.withId(eventId).set(() => fields);
}
