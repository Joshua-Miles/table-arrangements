import { AmbassadorClient } from "@triframe/ambassador";

export function createEventAttendee(this: AmbassadorClient | void, eventId: number, options: {
    name: string;
}): Promise<{
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "nameCannotBeEmpty";
} | {
    isFailure: true;
    code: "eventNotFound";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    eventId: number;
    partyId: null | number;
    tableId: null | number;
    seatNumber: null | number;
    name: string;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("createEventAttendee", eventId, options);
}