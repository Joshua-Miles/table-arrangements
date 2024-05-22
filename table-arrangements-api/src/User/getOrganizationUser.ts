import { Client } from "@triframe/proprietor";
import { GetOptions, observer, ObserverContext } from "@triframe/scribe";
import { Session } from "../Session";
import { assertUserHasRole, UserRoles, Users } from ".";

export const getOrganizationUser = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, organizationId: number, userId: number, options: GetOptions<typeof Users, S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.admin);
    if (failure) return failure;

    return await observe(Users.withOrganizationId(organizationId).withId(userId).get(options));
})
