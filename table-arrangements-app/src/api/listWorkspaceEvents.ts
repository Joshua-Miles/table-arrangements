import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listWorkspaceEvents<S>(this: AmbassadorClient | void, workspaceId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            workspaceId: number;
            name: string;
            roomWidth: null | number;
            roomLength: null | number;
            defaultTableFixtureTemplateId: null | number;
        };
        ᑕ_subset: S;
    };
    limit?: undefined | number;
    offset?: undefined | number;
    sort?: undefined | {
        field: "id" | "name" | "workspaceId" | "roomWidth" | "roomLength" | "defaultTableFixtureTemplateId";
        direction?: undefined | "ASC" | "DESC";
    } | {
        field: "id" | "name" | "workspaceId" | "roomWidth" | "roomLength" | "defaultTableFixtureTemplateId";
        direction?: undefined | "ASC" | "DESC";
    }[];
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | PageArray<S>> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("listWorkspaceEvents", workspaceId, options);
}