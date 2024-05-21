import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listOrganizationEvents<S>(this: AmbassadorClient | void, organizationId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            organizationId: number;
            name: string;
            roomWidth: null | number;
            roomLength: null | number;
            defaultTableObjectTemplateId: null | number;
        };
        ᑕ_subset: S;
    };
    limit?: undefined | number;
    offset?: undefined | number;
    sort?: undefined | {
        field: "id" | "name" | "organizationId" | "roomWidth" | "roomLength" | "defaultTableObjectTemplateId";
        direction?: undefined | "ASC" | "DESC";
    } | {
        field: "id" | "name" | "organizationId" | "roomWidth" | "roomLength" | "defaultTableObjectTemplateId";
        direction?: undefined | "ASC" | "DESC";
    }[];
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | PageArray<S>> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("listOrganizationEvents", organizationId, options);
}