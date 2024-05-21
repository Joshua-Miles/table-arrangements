import { Organizations } from "../Organization";
import { Users } from "./User";

export const UsersWithOrganization = Users.map( user => ({
    ...user,
    organization: Organizations.withId(user.organizationId)
}))
