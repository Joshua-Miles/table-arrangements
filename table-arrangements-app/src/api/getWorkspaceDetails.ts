import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getWorkspaceDetails<S>(this: AmbassadorClient | void, workspaceId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            creator: {
                id: number & {
                    __serial__?: undefined | true;
                };
                firstName: string;
                lastName: string;
                email: string;
            };
            id: number & {
                __serial__?: undefined | true;
            };
            name: null | string;
            isPersonalWorkspace: boolean;
            creatorId: number;
        };
        ᑕ_subset: S;
    };
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | S> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("getWorkspaceDetails", workspaceId, options);
}