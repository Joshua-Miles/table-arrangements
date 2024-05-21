import { Client } from "@triframe/proprietor";
import { GetOptions, observer, ObserverContext } from "@triframe/scribe";
import { Organizations } from ".";
import { Session } from "../Session";
import { assertUserHasRole, UserRoles } from "../User";


export const getOrganization = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, id: number, options: GetOptions<typeof Organizations, S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRole(loggedInUserId, id, UserRoles.user);
    if (failure) return failure;
    return await observe(Organizations.withId(id).get(options));
})
