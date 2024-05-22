import { Client } from "@triframe/proprietor";
import { makeFailure, SetFields } from "@triframe/scribe";
import { Organizations } from ".";
import { Session } from "../Session";
import { assertUserHasRole, UserRoles } from "../User";

export async function updateOrganization(client: Client<Session>, organizationId: number, values: SetFields<typeof Organizations>) {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.collaborator);
    if (failure) return failure;

    if (values.name === '') return makeFailure('organizationNameIsEmpty', {})

    await Organizations.withId(organizationId).set(() => values);

    return true;
}
