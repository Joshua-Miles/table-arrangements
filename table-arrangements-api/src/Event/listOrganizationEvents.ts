import { Client } from "@triframe/proprietor";
import { ListOptions, observer, ObserverContext} from "@triframe/scribe";
import { Session } from "../Session";
import { assertUserHasRole, UserRoles } from "../User";
import { Events } from "./Event";

export const listOrganizationEvents = observer(async <S>(
    { observe }: ObserverContext, client: Client<Session>, organizationId: number, options: ListOptions<typeof Events, S>
) => {
    const { loggedInUserId } = await client.getSession();

    const failure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.user);
    if (failure) return failure;

    return await observe(Events.withOrganizationId(organizationId).list(options));
})
