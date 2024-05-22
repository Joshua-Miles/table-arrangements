import { Client } from "@triframe/proprietor";
import { AppendFields, from, makeFailure, SetFields } from "@triframe/scribe";
import { Session } from "../Session";
import { Users } from "./User";
import { assertUserHasRole, UserRoles } from "../User";
import { hash } from "bcrypt";
import { validateCreateUserOptions } from "./validateCreateUserOptions";

type UpdateOrganizationUser = Omit<AppendFields<typeof Users>, 'passwordDigest' | 'organizationId'> & {
    password?: string
}

export async function updateOrganizationUser(client: Client<Session>, organizationId: number, userId: number, options: UpdateOrganizationUser) {
    const { loggedInUserId } = await client.getSession();

    const validationFailure = validateCreateUserOptions(options)
    if (validationFailure) return validationFailure;

    if (loggedInUserId !== userId) {
        const authorizationFailure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.admin);
        if (authorizationFailure) return authorizationFailure;
    }

    const existingUserWithEmail = await Users.withEmail(options.email).get({
        select: from(Users.type)
            .id()
    })

    if (existingUserWithEmail !== null && existingUserWithEmail.id !== userId) return makeFailure('emailIsInUse', {})

    const { password, ...rest } = options;

    let fields = rest as SetFields<typeof Users>;

    if (password !== undefined) {
        fields = {
            ...fields,
            passwordDigest: await hash(password, 10)
        }
    }

    return await Users.withId(userId).set( () => fields)
}
