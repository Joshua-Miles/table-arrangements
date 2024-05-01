import { AmbassadorClient } from "@triframe/ambassador";

export function updateEventAttendee(this: AmbassadorClient | void, eventId: number, attendeeId: number, fields: {
    id?: undefined | number;
    eventId?: undefined | number;
    partyId?: undefined | null | number;
    tableId?: undefined | null | number;
    seatNumber?: undefined | null | number;
    name?: undefined | string;
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
    partyId: null | number;
    tableId: null | number;
    seatNumber: null | number;
    name: string;
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("updateEventAttendee", eventId, attendeeId, fields);
}