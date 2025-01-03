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

    const publicRegistrationKey = generatePublicRegistrationKey(20);

    const event = await Events.append({ organizationId, name, publicRegistrationKey, isPublicRegistrationEnabled: false })

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

function generatePublicRegistrationKey(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}