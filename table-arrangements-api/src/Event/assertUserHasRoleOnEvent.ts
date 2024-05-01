import { from, makeFailure } from "@triframe/scribe";
import { assertUserHasRoleOnWorkspace, WorkspaceUserRole } from "../Workspace";
import { Events } from "./Event";

export async function assertUserHasRoleOnEvent(eventId: number, userId: number | null, role: WorkspaceUserRole) {
    if (userId ===  null) return makeFailure('userUnauthorized', {});

    const event = await Events.withId(eventId).get({ select: from(Events.type).workspaceId() });

    if (!event) return makeFailure('eventNotFound', {});

    const workspaceFailure = await assertUserHasRoleOnWorkspace(event.workspaceId, userId, role);
    if(workspaceFailure) return makeFailure('eventNotFound', {})

    return false
}
