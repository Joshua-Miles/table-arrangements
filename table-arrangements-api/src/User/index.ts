import { login } from "./login"
import { logout } from "./logout"
import { signUp } from "./signUp"
import { getLoggedInUser } from "./getLoggedInUser"
import { listOrganizationUsers } from "./listOrganizationUsers"
import { getOrganizationUser } from "./getOrganizationUser"
import { createOrganizationUser } from "./createOrganizationUser"
import { updateOrganizationUser } from "./updateOrganizationUser"


import { Users } from "./User"
import { UsersWithOrganization } from "./UserWithOrganization"
import { UserRoles, UserRole } from './UserRoles';

export { Users }
export { UserRoles, UserRole }
export { assertUserHasRole } from './assertUserHasRole'

export const PublicUserInterface = {
    getLoggedInUser,
    listOrganizationUsers,
    getOrganizationUser,
    createOrganizationUser,
    updateOrganizationUser,
    login,
    logout,
    signUp,
    UserType: Users.omit('passwordDigest').type,
    UserWithOrganizationType: UsersWithOrganization.omit('passwordDigest').type,
    UserRoles
}
