import { getUserRoleOnWorkspace } from "./getUserRoleOnWorkspace";
import { WorkspaceUserRole, WorkspaceUserRoles, WorkspaceUsers } from "./WorkspaceUser";

export async function addUserToWorkspace(workspaceId: number, userId: number, role: WorkspaceUserRole = WorkspaceUserRoles.user) {
    const existingRole = await getUserRoleOnWorkspace(workspaceId, userId);

    if (existingRole === role) return true;

    if (existingRole !== null) {
        await WorkspaceUsers.withWorkspaceIdAndUserId(workspaceId, userId).set( () => ({ role }));
        return true;
    }

    await WorkspaceUsers.append({ workspaceId, userId, role });
    return true;
}
