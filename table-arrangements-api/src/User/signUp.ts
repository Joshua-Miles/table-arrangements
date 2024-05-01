import { Client } from '@triframe/proprietor';
import { from, makeFailure } from '@triframe/scribe'
import { hash } from 'bcrypt'
import { Session } from '../Session';
import { addUserToWorkspace, createWorkspace } from '../Workspace';
import { WorkspaceUserRoles } from '../Workspace/WorkspaceUser';
import { login } from './login';
import { Users } from './User';
import { validateLoginOrSignupOptions } from './validateLoginOrSignupOptions';

type SignUpOptions = {
    firstName: string;
    lastName: string;
    email: string
    password: string
}

export async function signUp(client: Client<Session>, options: SignUpOptions) {
    const error = validateSignupOptions(options);
    if (error) return error;

    const { email, password, firstName, lastName } = options;

    const existingUserWithEmail = await Users.withEmail(options.email).get({
        select: from(Users.type)
            .id()
    })

    if (existingUserWithEmail !== null) return makeFailure('emailIsInUse', {})

    const passwordDigest = await hash(password, 10);

    const user = await Users.append({ email, passwordDigest, firstName, lastName });

    const personalWorkspace = await createWorkspace({
        name: null,
        isPersonalWorkspace: true,
        creatorId: user.id
    })

    await addUserToWorkspace(personalWorkspace.id, user.id, WorkspaceUserRoles.admin);

    await login(client, options);

    return user.id;
}

function validateSignupOptions(options: SignUpOptions) {
    const error = validateLoginOrSignupOptions(options)
    if (error) return error;

    if (!options.firstName) return makeFailure('firstNameIsEmpty', {})
    if (!options.firstName) return makeFailure('lastNameIsEmpty', {})
    return false;
}
