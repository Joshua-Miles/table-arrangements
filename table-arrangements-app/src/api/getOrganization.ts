import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getOrganization<S>(this: AmbassadorClient | void, id: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            name: string;
        };
        ᑕ_subset: S;
    };
}): Observable<S | {
    isFailure: true;
    code: "userUnauthorized";
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("getOrganization", id, options);
}