import { from, makeFailure } from "@triframe/scribe";
import { assertUserHasRole, UserRole } from "../User";
import { Events } from "./Event";

export async function assertUserHasRoleOnEvent(eventId: number, userId: number | null, role: UserRole) {
    if (userId ===  null) return makeFailure('userUnauthorized', {});

    const event = await Events.withId(eventId).get({ select: from(Events.type).organizationId() });

    if (!event) return makeFailure('eventNotFound', {});

    const roleFailure = await assertUserHasRole(userId, event.organizationId, role);
    if(roleFailure) return makeFailure('eventNotFound', {})

    return false
}
