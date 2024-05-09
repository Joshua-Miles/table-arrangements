import { Client } from "@triframe/proprietor";
import { makeFailure } from "@triframe/scribe";
import { Session } from "../Session";
import { WorkspaceUserRoles, assertUserHasRoleOnWorkspace } from "../Workspace";
import { Events } from "./Event";
import { createDefaultFixtureTemplates } from "./FixtureTemplate";
import { Tables } from "./Table";

type CreateWorkspaceEventOptions = {
    name: string;
    numberOfTables: null | number
    tableCapacity: null | number
}

export async function createWorkspaceEvent(client: Client<Session>, workspaceId: number, options: CreateWorkspaceEventOptions) {
    const { loggedInUserId } = await client.getSession();

    const { name, numberOfTables, tableCapacity } = options;

    if (!name) return makeFailure('nameCannotBeEmpty', {});

    const authorizationFailure = await assertUserHasRoleOnWorkspace(workspaceId, loggedInUserId, WorkspaceUserRoles.collaborator);
    if (authorizationFailure) return authorizationFailure;

    const event = await Events.append({ workspaceId, name })

    if (numberOfTables && tableCapacity) {
        await Tables.appendMany(new Array(numberOfTables).fill(null).map( (_, index) => ({
            eventId: event.id,
            label: `Table ${index + 1}`,
            orderby: index,
            capacity: tableCapacity
        })))
    }

    await createDefaultFixtureTemplates(event.id)

    return event;
}