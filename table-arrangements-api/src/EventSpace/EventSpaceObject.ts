import { persist, Serial } from "@triframe/scribe";

export type EventSpaceFurnishing = {
    id: Serial
    eventSpaceId: number
    furnishingId: number
    x: number
    y: number
}

export const EventSpaceObjects = persist<EventSpaceFurnishing>();

