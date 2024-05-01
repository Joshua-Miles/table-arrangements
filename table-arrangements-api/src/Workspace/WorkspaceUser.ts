import { from, persist, Serial } from "@triframe/scribe";

export const WorkspaceUserRoles = {
    admin: 100,
    collaborator: 10,
    user: 1
} as const

export type WorkspaceUserRole = (typeof WorkspaceUserRoles)[keyof (typeof WorkspaceUserRoles)]

export type WorkspaceUser = {
    id: Serial
    workspaceId: number
    userId: number
    role: WorkspaceUserRole
}

export const WorkspaceUsers = persist<WorkspaceUser>()
    .primaryKey('id')
    .uniqueIndexBy('workspaceId', 'userId')
    .indexBy('workspaceId')
    .indexBy('userId');
