import { makeFailure } from "@triframe/scribe";
import { getUserRoleOnWorkspace } from "./getUserRoleOnWorkspace";
import { WorkspaceUserRole } from "./WorkspaceUser";

export async function assertUserHasRoleOnWorkspace(workspaceId: number, userId: number | null, role: WorkspaceUserRole) {
    if (userId ===  null) return makeFailure('userUnauthorized', {});

    const existingRole = await getUserRoleOnWorkspace(workspaceId, userId);
    if (!existingRole || existingRole < role) return makeFailure('userUnauthorized', {});

    return false
}
