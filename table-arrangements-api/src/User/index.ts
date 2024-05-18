import { login } from "./login"
import { logout } from "./logout"
import { signUp } from "./signUp"
import { getLoggedInUser } from "./getLoggedInUser"
import { Users } from "./User"
import { UserWithWorkspaces } from "./UserWithWorkspaces"

export const PublicUserInterface = {
    getLoggedInUser,
    login,
    logout,
    signUp,
    UserType: Users.omit('passwordDigest').type,
    UserWithWorspacesType: UserWithWorkspaces.omit('passwordDigest').type
}
