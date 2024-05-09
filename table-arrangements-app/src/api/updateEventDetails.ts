import { AmbassadorClient } from "@triframe/ambassador";

export function updateEventDetails(this: AmbassadorClient | void, eventId: number, fields: {
    tables?: undefined | (undefined | {
        id?: undefined | number;
        label?: undefined | string;
        orderby?: undefined | number;
        capacity?: undefined | number;
        fixtureId?: undefined | null | number;
    })[];
    tags?: undefined | (undefined | {
        id?: undefined | number;
        color?: undefined | string;
        label?: undefined | string;
    })[];
    fixtureTemplates?: undefined | (undefined | {
        length?: undefined | number;
        id?: undefined | number;
        width?: undefined | number;
        color?: undefined | string;
        label?: undefined | string;
        shape?: undefined | "round" | "rectangle";
    })[];
    fixtures?: undefined | (undefined | {
        id?: undefined | number;
        x?: undefined | number;
        y?: undefined | number;
        templateId?: undefined | number;
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
    workspaceId?: undefined | number;
    name?: undefined | string;
    roomWidth?: undefined | null | number;
    roomLength?: undefined | null | number;
    defaultTableFixtureTemplateId?: undefined | null | number;
}): Promise<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "eventNotFound";
} | {
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
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("updateEventDetails", eventId, fields);
}