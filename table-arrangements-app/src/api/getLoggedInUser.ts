import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getLoggedInUser<S>(this: AmbassadorClient | void, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            organization: {
                id: number & {
                    __serial__?: undefined | true;
                };
                name: string;
            };
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
}): Observable<null | S> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("getLoggedInUser", options);
}