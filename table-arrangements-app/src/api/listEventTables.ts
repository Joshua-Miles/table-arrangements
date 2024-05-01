import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listEventTables<S>(this: AmbassadorClient | void, eventId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            eventId: number;
            label: string;
            orderby: number;
            capacity: number;
        };
        ᑕ_subset: S;
    };
    limit?: undefined | number;
    offset?: undefined | number;
    sort?: undefined | {
        field: "id" | "label" | "eventId" | "orderby" | "capacity";
        direction?: undefined | "ASC" | "DESC";
    } | {
        field: "id" | "label" | "eventId" | "orderby" | "capacity";
        direction?: undefined | "ASC" | "DESC";
    }[];
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "eventNotFound";
} | PageArray<S>> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("listEventTables", eventId, options);
}