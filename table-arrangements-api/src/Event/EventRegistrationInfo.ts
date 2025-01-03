import { CustomFields } from "./CustomField";
import { Events } from "./Event";

export const EventRegistrationInfo = Events
    .uniqueIndexBy('publicRegistrationKey')
    .filter( event => event.isPublicRegistrationEnabled === true)
    .map( event => ({
        ...event,
        customFields: CustomFields.withEventId(event.id)
    }))
