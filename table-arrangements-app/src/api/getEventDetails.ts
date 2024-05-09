import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getEventDetails<S>(this: AmbassadorClient | void, eventId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            tables: {
                id: number & {
                    __serial__?: undefined | true;
                };
                label: string;
                orderby: number;
                capacity: number;
                fixtureId: null | number;
            }[];
            tags: {
                id: number & {
                    __serial__?: undefined | true;
                };
                color: string;
                label: string;
            }[];
            fixtureTemplates: {
                length: number;
                id: number & {
                    __serial__?: undefined | true;
                };
                width: number;
                color: string;
                label: string;
                shape: "round" | "rectangle";
            }[];
            fixtures: {
                id: number & {
                    __serial__?: undefined | true;
                };
                x: number;
                y: number;
                templateId: number;
            }[];
            parties: {
                attendees: {
                    id: number & {
                        __serial__?: undefined | true;
                    };
                    name: string;
                    tagId: null | number;
                }[];
                id: number & {
                    __serial__?: undefined | true;
                };
                name: string;
                color: string;
                orderby: null | number;
                tableId: null | number;
            }[];
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
}): Observable<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "eventNotFound";
} | S> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("getEventDetails", eventId, options);
}