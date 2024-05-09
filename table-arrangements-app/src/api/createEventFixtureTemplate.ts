import { AmbassadorClient } from "@triframe/ambassador";

export function createEventFixtureTemplate(this: AmbassadorClient | void, eventId: number, fields: {
    length: number;
    width: number;
    color: string;
    label: string;
    shape: "round" | "rectangle";
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
    shape: "round" | "rectangle";
    color: string;
    width: number;
    length: number;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("createEventFixtureTemplate", eventId, fields);
}