import { Client } from "@triframe/proprietor";
import { observer, ObserverContext, GetOptions} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Events } from "./Event";

export const getEvent = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, eventId: number, options: GetOptions<typeof Events, S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    return await observe(Events.withId(eventId).get(options));
})
