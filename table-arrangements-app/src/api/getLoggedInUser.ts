import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getLoggedInUser<S>(this: AmbassadorClient | void, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            personalWorkspace: null | {
                id: number & {
                    __serial__?: undefined | true;
                };
                name: null | string;
                isPersonalWorkspace: boolean;
                creatorId: number;
            };
            id: number & {
                __serial__?: undefined | true;
            };
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