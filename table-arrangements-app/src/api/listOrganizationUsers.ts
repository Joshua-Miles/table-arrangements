import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listOrganizationUsers<S>(this: AmbassadorClient | void, organizationId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            organizationId: number;
            role: number;
            firstName: string;
            lastName: string;
            email: string;
            passwordDigest: string;
        };
        ᑕ_subset: S;
    };
    limit?: undefined | number;
    offset?: undefined | number;
    sort?: undefined | {
        field: "id" | "organizationId" | "role" | "firstName" | "lastName" | "email" | "passwordDigest";
        direction?: undefined | "ASC" | "DESC";
    } | {
        field: "id" | "organizationId" | "role" | "firstName" | "lastName" | "email" | "passwordDigest";
        direction?: undefined | "ASC" | "DESC";
    }[];
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | PageArray<S>> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("listOrganizationUsers", organizationId, options);
}