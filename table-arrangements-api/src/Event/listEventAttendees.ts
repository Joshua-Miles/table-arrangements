import { Client } from "@triframe/proprietor";
import { observer, ObserverContext, ListOptions} from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles } from "../Workspace";
import { assertUserHasRoleOnEvent } from "./assertUserHasRoleOnEvent";
import { Attendees } from "./Attendee";

type ListAttendeeOptions<S> = ListOptions<typeof Attendees, S> & {
    tableId?: number | null | undefined
}

export const listEventAttendees = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, eventId: number, options: ListAttendeeOptions<S>) => {
    const { loggedInUserId } = await client.getSession();
    const failure = await assertUserHasRoleOnEvent(eventId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (failure) return failure;

    let SelectedAttendees = Attendees.withEventId(eventId);

    if (options.tableId !== undefined) {
        SelectedAttendees = SelectedAttendees.withTableId(options.tableId);
    }

    return await observe(SelectedAttendees.list(options));
})
