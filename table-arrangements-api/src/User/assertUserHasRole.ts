import { from, makeFailure } from "@triframe/scribe";
import { Users } from "./User";

export async function assertUserHasRole(userId: number | null, organizationId: number, role: number) {
    if (userId ===  null) return makeFailure('userUnauthorized', {});

    const user = await Users.withId(userId).get({ select: from(Users.type).role().organizationId() })
    if (!user || user.organizationId !== organizationId || user.role < role) return makeFailure('userUnauthorized', {});

    return false
}
