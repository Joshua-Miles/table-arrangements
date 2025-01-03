import { Attendee, Party, Table } from "../_shared/fields";
import { inferPartyName } from "./inferPartyName";

export function inferTableName(table: Table, parties: Party[]) {
    if (table.label) return table.label;

    const tableParties = parties.filter( party => party.tableId === table.id);
    tableParties.sort( (a, b) => (a.orderby ?? 0) - (b.orderby ?? 0))

    if (tableParties[0]) return inferPartyName(tableParties[0])

    return `Unnamed`
}
