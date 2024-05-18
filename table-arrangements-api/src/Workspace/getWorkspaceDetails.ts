import { Client } from "@triframe/proprietor";
import { GetOptions, observer, ObserverContext} from "@triframe/scribe";
import { Session } from "../Session";
import { Users } from "../User/User";
import { WorkspaceUserRoles, assertUserHasRoleOnWorkspace } from ".";
import { Workspaces } from "./Workspace";

export const WorkspaceDetails = Workspaces.map( workspace => ({
    ...workspace,
    creator: Users.omit('passwordDigest').withId(workspace.creatorId)
}))

export const getWorkspaceDetails = observer(async <S>(
    { observe }: ObserverContext, client: Client<Session>, workspaceId: number, options: GetOptions<typeof WorkspaceDetails, S>
) => {
    const { loggedInUserId } = await client.getSession();

    const authorizationFailure = await assertUserHasRoleOnWorkspace(workspaceId, loggedInUserId, WorkspaceUserRoles.user);
    if (authorizationFailure) return authorizationFailure;

    return await observe(WorkspaceDetails.withId(workspaceId).get(options));
})
