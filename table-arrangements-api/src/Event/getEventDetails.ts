import { Client } from "@triframe/proprietor";
import { observer, ObserverContext, GetOptions} from "@triframe/scribe";
import { Session } from "../Session";
import { UserRoles } from "../User";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { EventDetails } from "./EventDetails";

export const getEventDetails = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, eventId: number, options: GetOptions<typeof EventDetails, S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, UserRoles.collaborator);
    if (failure) return failure;

    return await observe(EventDetails.withId(eventId).get(options));
})
