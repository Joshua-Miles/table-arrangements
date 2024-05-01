import { Workspaces } from "../Workspace";
import { Users } from "./User";

export const UserWithWorkspaces = Users.map( user => ({
    ...user,
    personalWorkspace: Workspaces.findOrThrow( workspace => workspace.creatorId === user.id && workspace.isPersonalWorkspace)
}))
