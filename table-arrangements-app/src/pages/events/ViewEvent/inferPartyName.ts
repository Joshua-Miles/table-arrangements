import { Party } from "./fields";

export function inferPartyName(party: Party) {
    if (party.name) return party.name;
    if (party.attendees[0]) return `${party.attendees[0].name}'s Party`;
    return 'Unnamed Party'
}