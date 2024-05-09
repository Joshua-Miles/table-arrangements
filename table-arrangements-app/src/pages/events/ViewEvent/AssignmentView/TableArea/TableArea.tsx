import { Box, BoxProps, SimpleGrid } from "@chakra-ui/react";
import { EventDetails, Party } from "../../fields";
import { Table } from "./Table";

type TableAreaProps = BoxProps & {
    eventId: number
    event: EventDetails;
    onPartySelected: (party: Party) => void;
}

export function TableArea({ eventId, event, onPartySelected, ...boxProps }: TableAreaProps) {
    return (
        <Box {...boxProps} padding={5} height="100%" overflowY="scroll">
            <SimpleGrid columns={3} spacing={2}>
                {event.tables.map( table => (
                    <Table
                        table={table}
                        parties={event.parties.filter( party => party.tableId === table.id)}
                        onPartySelected={onPartySelected}
                    />
                ))}
            </SimpleGrid>
        </Box>
    )
}
