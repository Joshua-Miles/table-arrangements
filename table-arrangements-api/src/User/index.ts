import { login } from "./login"
import { logout } from "./logout"
import { signUp } from "./signUp"
import { getLoggedInUser } from "./getLoggedInUser"
import { Users } from "./User"
import { UsersWithOrganization } from "./UserWithOrganization"

export { UserRoles, UserRole } from './UserRoles';
export { assertUserHasRole } from './assertUserHasRole'

export const PublicUserInterface = {
    getLoggedInUser,
    login,
    logout,
    signUp,
    UserType: Users.omit('passwordDigest').type,
    UserWithOrganizationType: UsersWithOrganization.omit('passwordDigest').type
}
