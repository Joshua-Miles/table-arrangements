import { AmbassadorClient } from "@triframe/ambassador";

export function createOrganizationEvent(this: AmbassadorClient | void, organizationId: number, options: {
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
    organizationId: number;
    name: string;
    roomWidth: null | number;
    roomLength: null | number;
    defaultTableObjectTemplateId: null | number;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("createOrganizationEvent", organizationId, options);
}