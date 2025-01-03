import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getEventRegistrationInfo<S>(this: AmbassadorClient | void, publicRegistrationKey: string, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            customFields: {
                id: number & {
                    __serial__?: undefined | true;
                };
                eventId: number;
                orderby: number;
                scope: "party" | "attendee";
                name: string;
                type: "text" | "email" | "phone";
                prompt: string;
                placeholder: string;
                isRequired: boolean;
            }[];
            id: number & {
                __serial__?: undefined | true;
            };
            organizationId: number;
            name: string;
            roomWidth: null | number;
            roomLength: null | number;
            defaultTableObjectTemplateId: null | number;
            isPublicRegistrationEnabled: boolean;
            publicRegistrationKey: string;
        };
        ᑕ_subset: S;
    };
}): Observable<S> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteObservableFunction("getEventRegistrationInfo", publicRegistrationKey, options);
}