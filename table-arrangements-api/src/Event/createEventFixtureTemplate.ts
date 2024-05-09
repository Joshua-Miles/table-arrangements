import { Client } from "@triframe/proprietor";
import { AppendFields} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { FixtureTemplates } from "./FixtureTemplate";

export async function createEventFixtureTemplate(client: Client<Session>, eventId: number, fields: Omit<AppendFields<typeof FixtureTemplates>, 'eventId'>) {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    return await FixtureTemplates.append({ ...fields, eventId });
}
