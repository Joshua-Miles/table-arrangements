import { login } from "./login"
import { signUp } from "./signUp"
import { getLoggedInUser } from "./getLoggedInUser"
import { Users } from "./User"
import { UserWithWorkspaces } from "./UserWithWorkspaces"

export const PublicUserInterface = {
    getLoggedInUser,
    login,
    signUp,
    UserType: Users.omit('passwordDigest').type,
    UserWithWorspacesType: UserWithWorkspaces.omit('passwordDigest').type
}
