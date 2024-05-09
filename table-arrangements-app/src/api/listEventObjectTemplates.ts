import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listEventObjectTemplates<S>(this: AmbassadorClient | void, eventId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            workspaceId: number;
            label: string;
            shape: "round" | "rectangle";
            color: string;
            width: number;
            length: number;
        };
        ᑕ_subset: S;
    };
    limit?: undefined | number;
    offset?: undefined | number;
    sort?: undefined | {
        field: "length" | "id" | "width" | "color" | "label" | "workspaceId" | "shape";
        direction?: undefined | "ASC" | "DESC";
    } | {
        field: "length" | "id" | "width" | "color" | "label" | "workspaceId" | "shape";
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
    return api.callRemoteObservableFunction("listEventObjectTemplates", eventId, options);
}