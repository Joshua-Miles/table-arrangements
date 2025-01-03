import { AmbassadorClient } from "@triframe/ambassador";

export function updateEventDetails(this: AmbassadorClient | void, eventId: number, fields: {
    tables?: undefined | (undefined | {
        number?: undefined | number;
        length?: undefined | null | number;
        id?: undefined | number;
        width?: undefined | null | number;
        color?: undefined | null | string;
        zIndex?: undefined | null | number;
        label?: undefined | null | string;
        x?: undefined | null | number;
        y?: undefined | null | number;
        shape?: undefined | null | "round" | "rectangle";
        orderby?: undefined | number;
        capacity?: undefined | number;
    })[];
    tags?: undefined | (undefined | {
        id?: undefined | number;
        color?: undefined | string;
        label?: undefined | string;
    })[];
    fixtures?: undefined | (undefined | {
        length?: undefined | number;
        id?: undefined | number;
        width?: undefined | number;
        color?: undefined | string;
        zIndex?: undefined | null | number;
        label?: undefined | string;
        x?: undefined | number;
        y?: undefined | number;
        shape?: undefined | "round" | "rectangle";
    })[];
    customFields?: undefined | (undefined | {
        type?: undefined | "text" | "email" | "phone";
        id?: undefined | number;
        name?: undefined | string;
        prompt?: undefined | string;
        scope?: undefined | "party" | "attendee";
        orderby?: undefined | number;
        placeholder?: undefined | string;
        isRequired?: undefined | boolean;
    })[];
    parties?: undefined | (undefined | {
        attendees?: undefined | (undefined | {
            id?: undefined | number;
            name?: undefined | string;
            tagId?: undefined | null | number;
        })[];
        id?: undefined | number;
        name?: undefined | string;
        color?: undefined | string;
        orderby?: undefined | null | number;
        tableId?: undefined | null | number;
    })[];
    id?: undefined | number;
    organizationId?: undefined | number;
    name?: undefined | string;
    roomWidth?: undefined | null | number;
    roomLength?: undefined | null | number;
    defaultTableObjectTemplateId?: undefined | null | number;
    isPublicRegistrationEnabled?: undefined | boolean;
    publicRegistrationKey?: undefined | string;
}): Promise<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "eventNotFound";
} | {
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
    customFields: {
        type: "text" | "email" | "phone";
        id: number & {
            __serial__?: undefined | true;
        };
        name: string;
        prompt: string;
        scope: "party" | "attendee";
        orderby: number;
        placeholder: string;
        isRequired: boolean;
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
    isPublicRegistrationEnabled: boolean;
    publicRegistrationKey: string;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("updateEventDetails", eventId, fields);
}