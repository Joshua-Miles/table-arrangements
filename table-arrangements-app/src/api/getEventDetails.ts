import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getEventDetails<S>(this: AmbassadorClient | void, eventId: number, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            tables: {
                number: number;
                length: null | number;
                id: number & {
                    __serial__?: undefined | true;
                };
                width: null | number;
                color: null | string;
                zIndex: null | number;
                label: null | string;
                x: null | number;
                y: null | number;
                shape: null | "round" | "rectangle";
                orderby: number;
                capacity: number;
            }[];
            tags: {
                id: number & {
                    __serial__?: undefined | true;
                };
                color: string;
                label: string;
            }[];
            fixtures: {
                length: number;
                id: number & {
                    __serial__?: undefined | true;
                };
                width: number;
                color: string;
                zIndex: null | number;
                label: string;
                x: number;
                y: number;
                shape: "round" | "rectangle";
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
            organizationId: number;
            name: string;
            roomWidth: null | number;
            roomLength: null | number;
            defaultTableObjectTemplateId: null | number;
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