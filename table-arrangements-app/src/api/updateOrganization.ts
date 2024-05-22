import { AmbassadorClient } from "@triframe/ambassador";

export function updateOrganization(this: AmbassadorClient | void, organizationId: number, values: {
    id?: undefined | number;
    name?: undefined | string;
}): Promise<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "organizationNameIsEmpty";
} | true> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("updateOrganization", organizationId, values);
}