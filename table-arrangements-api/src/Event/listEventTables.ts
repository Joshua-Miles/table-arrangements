import { Client } from "@triframe/proprietor";
import { observer, ObserverContext, ListOptions} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Tables } from "./Table";

export const listEventTables = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, eventId: number, options: ListOptions<typeof Tables, S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    return await observe(Tables.withEventId(eventId).list(options));
})
