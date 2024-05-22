import { Client } from '@triframe/proprietor';
import { from, makeFailure } from '@triframe/scribe'
import { hash } from 'bcrypt'
import { createOrganization } from '../Organization';
import { Session } from '../Session';
import { login } from './login';
import { Users } from './User';
import { UserRoles } from './UserRoles';
import { validateCreateUserOptions } from './validateCreateUserOptions';
import { validateLoginOrSignupOptions } from './validateLoginOrSignupOptions';

type SignUpOptions = {
    firstName: string;
    lastName: string;
    organizationName?: string;
    email: string
    password: string
}

export async function signUp(client: Client<Session>, options: SignUpOptions) {
    const error = validateCreateUserOptions(options);
    if (error) return error;

    const { email, password, firstName, lastName, organizationName } = options;

    const existingUserWithEmail = await Users.withEmail(options.email).get({
        select: from(Users.type)
            .id()
    })

    if (existingUserWithEmail !== null) return makeFailure('emailIsInUse', {})

    const passwordDigest = await hash(password, 10);

    const organization = await createOrganization({
        name: organizationName ?? `${firstName}'s Table Arrangements`,
    })

    const organizationId = organization.id;

    const role = UserRoles.admin;

    const user = await Users.append({ organizationId, role, email, passwordDigest, firstName, lastName });

    await login(client, options);

    return user.id;
}
