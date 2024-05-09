import { Client } from "@triframe/proprietor";
import { AppendFields} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Tags } from "./Tags";

export async function createEventTag(client: Client<Session>, eventId: number, fields: Omit<AppendFields<typeof Tags>, 'eventId'>) {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    return await Tags.append({ ...fields, eventId });
}
