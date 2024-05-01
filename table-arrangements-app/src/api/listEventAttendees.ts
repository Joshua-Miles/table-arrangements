import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listEventAttendees<S>(this: AmbassadorClient | void, eventId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            eventId: number;
            partyId: null | number;
            tableId: null | number;
            seatNumber: null | number;
            name: string;
        };
        ᑕ_subset: S;
    };
    limit?: undefined | number;
    offset?: undefined | number;
    sort?: undefined | {
        field: "id" | "name" | "eventId" | "partyId" | "tableId" | "seatNumber";
        direction?: undefined | "ASC" | "DESC";
    } | {
        field: "id" | "name" | "eventId" | "partyId" | "tableId" | "seatNumber";
        direction?: undefined | "ASC" | "DESC";
    }[];
} & {
    tableId?: undefined | null | number;
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "eventNotFound";
} | PageArray<S>> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("listEventAttendees", eventId, options);
}