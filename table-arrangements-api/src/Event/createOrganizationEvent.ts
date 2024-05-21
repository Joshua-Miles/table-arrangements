import { Client } from "@triframe/proprietor";
import { makeFailure } from "@triframe/scribe";
import { Session } from "../Session";
import { Events } from "./Event";
import { Tables } from "./Table";
import { assertUserHasRole, UserRoles } from "../User";

type CreateOrganizationEventOptions = {
    name: string;
    numberOfTables: null | number
    tableCapacity: null | number
}

export async function createOrganizationEvent(client: Client<Session>, organizationId: number, options: CreateOrganizationEventOptions) {
    const { loggedInUserId } = await client.getSession();

    const { name, numberOfTables, tableCapacity } = options;

    if (!name) return makeFailure('nameCannotBeEmpty', {});

    const authorizationFailure = await assertUserHasRole(loggedInUserId, organizationId, UserRoles.collaborator);
    if (authorizationFailure) return authorizationFailure;

    const event = await Events.append({ organizationId, name })

    if (numberOfTables && tableCapacity) {
        await Tables.appendMany(new Array(numberOfTables).fill(null).map( (_, index) => ({
            eventId: event.id,
            number: index + 1,
            orderby: index,
            capacity: tableCapacity,
        })))
    }

    return event;
}