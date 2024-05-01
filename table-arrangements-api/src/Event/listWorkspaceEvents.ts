import { Client } from "@triframe/proprietor";
import { ListOptions, observer, ObserverContext} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles, assertUserHasRoleOnWorkspace } from "../Workspace";
import { Events } from "./Event";

export const listWorkspaceEvents = observer(async <S>(
    { observe }: ObserverContext, client: Client<Session>, workspaceId: number, options: ListOptions<typeof Events, S>
) => {
    const { loggedInUserId } = await client.getSession();

    const authorizationFailure = await assertUserHasRoleOnWorkspace(workspaceId, loggedInUserId, WorkspaceUserRoles.user);
    if (authorizationFailure) return authorizationFailure;

    return await observe(Events.withWorkspaceId(workspaceId).list(options));
})
