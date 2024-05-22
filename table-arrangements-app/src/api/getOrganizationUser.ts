import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getOrganizationUser<S>(this: AmbassadorClient | void, organizationId: number, userId: number, options: {
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
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | S> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("getOrganizationUser", organizationId, userId, options);
}