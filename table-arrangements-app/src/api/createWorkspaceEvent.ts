import { AmbassadorClient } from "@triframe/ambassador";

export function createWorkspaceEvent(this: AmbassadorClient | void, workspaceId: number, options: {
    name: string;
    numberOfTables: null | number;
    tableCapacity: null | number;
}): Promise<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "nameCannotBeEmpty";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    workspaceId: number;
    name: string;
    roomWidth: null | number;
    roomLength: null | number;
    defaultTableObjectTemplateId: null | number;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("createWorkspaceEvent", workspaceId, options);
}