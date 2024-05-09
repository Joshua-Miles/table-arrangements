import { AmbassadorClient } from "@triframe/ambassador";

export function createEventTag(this: AmbassadorClient | void, eventId: number, fields: {
    color: string;
    label: string;
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
    label: string;
    color: string;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("createEventTag", eventId, fields);
}