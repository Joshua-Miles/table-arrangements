import { Client } from "@triframe/proprietor";
import { ListOptions, observer, ObserverContext } from "@triframe/scribe";
import { Session } from "../Session";
import { assertUserHasRole, UserRoles, Users } from ".";

export const listOrganizationUsers = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, organizationId: number, options: ListOptions<typeof Users, S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.admin);
    if (failure) return failure;

    return await observe(Users.withOrganizationId(organizationId).list(options));
})
