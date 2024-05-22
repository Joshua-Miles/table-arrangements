import { Client } from "@triframe/proprietor";
import { AppendFields, from, makeFailure } from "@triframe/scribe";
import { Session } from "../Session";
import { Users } from "./User";
import { assertUserHasRole, UserRoles } from "../User";
import { validateLoginOrSignupOptions } from "./validateLoginOrSignupOptions";
import { hash } from "bcrypt";
import { validateCreateUserOptions } from "./validateCreateUserOptions";

type CreateOrganizationUserOptions = Omit<AppendFields<typeof Users>, 'passwordDigest' | 'organizationId'> & {
    password: string
}

export async function createOrganizationUser(client: Client<Session>, organizationId: number, options: CreateOrganizationUserOptions) {
    const { loggedInUserId } = await client.getSession();

    const validationFailure = validateCreateUserOptions(options)
    if (validationFailure) return validationFailure;

    const authorizationFailure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.admin);
    if (authorizationFailure) return authorizationFailure;

    const existingUserWithEmail = await Users.withEmail(options.email).get({
        select: from(Users.type)
            .id()
    })

    if (existingUserWithEmail !== null) return makeFailure('emailIsInUse', {})

    const { password, ...fields } = options;

    const passwordDigest = await hash(password, 10);

    return await Users.append({ organizationId, passwordDigest, ...fields })
}
