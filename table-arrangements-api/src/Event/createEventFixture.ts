import { Client } from "@triframe/proprietor";
import { AppendFields} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Fixtures } from "./Fixture";
import { FixtureTemplates } from "./FixtureTemplate";

export async function createEventFixture(client: Client<Session>, eventId: number, fields: Omit<AppendFields<typeof Fixtures>, 'eventId'>) {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    return await Fixtures.append({ ...fields, eventId });
}
