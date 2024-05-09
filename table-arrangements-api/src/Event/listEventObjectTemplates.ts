import { Client } from "@triframe/proprietor";
import { from, ListOptions, makeFailure, observer, ObserverContext} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles, assertUserHasRoleOnWorkspace } from "../Workspace";
import { ObjectTemplates } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Events } from "./Event";

export const listEventObjectTemplates = observer(async <S>(
    { observe }: ObserverContext, client: Client<Session>, eventId: number, options: ListOptions<typeof ObjectTemplates, S>
) => {
    const { loggedInUserId } = await client.getSession();

    const authorizationFailure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.user);
    if (authorizationFailure) return authorizationFailure;

    const event = await Events.withId(eventId).get({ select: from(Events.type).workspaceId() });

    if (!event) return makeFailure('eventNotFound', {});

    return await observe(ObjectTemplates.withWorkspaceId(event.workspaceId).list(options));
})
