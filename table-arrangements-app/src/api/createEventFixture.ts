import { AmbassadorClient } from "@triframe/ambassador";

export function createEventFixture(this: AmbassadorClient | void, eventId: number, fields: {
    x: number;
    y: number;
    templateId: number;
}): Promise<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "eventNotFound";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    eventId: number;
    templateId: number;
    x: number;
    y: number;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("createEventFixture", eventId, fields);
}