import { from } from "@triframe/scribe";
import { WorkspaceUserRole, WorkspaceUsers } from "./WorkspaceUser";

export async function getUserRoleOnWorkspace(workspaceId: number, userId: number): Promise<WorkspaceUserRole | null> {
    const existing = await WorkspaceUsers.withWorkspaceIdAndUserId(workspaceId, userId).get({
        select: from(WorkspaceUsers.type)
            .id()
            .role()
    })

    return existing?.role ?? null;
}
