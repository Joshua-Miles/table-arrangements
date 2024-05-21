import { Client } from "@triframe/proprietor";
import { from, ListOptions, makeFailure, observer, ObserverContext} from "@triframe/scribe";
import { Session } from "../Session";
import { ObjectTemplates } from "../Organization";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Events } from "./Event";
import { UserRoles } from "../User";

export const listEventObjectTemplates = observer(async <S>(
    { observe }: ObserverContext, client: Client<Session>, eventId: number, options: ListOptions<typeof ObjectTemplates, S>
) => {
    const { loggedInUserId } = await client.getSession();

    const authorizationFailure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, UserRoles.user);
    if (authorizationFailure) return authorizationFailure;

    const event = await Events.withId(eventId).get({ select: from(Events.type).organizationId() });

    if (!event) return makeFailure('eventNotFound', {});

    return await observe(ObjectTemplates.withOrganizationId(event.organizationId).list(options));
})
