import { Box, BoxProps, Card, CardBody, SimpleGrid, VStack } from "@chakra-ui/react";
import { isLoading, usePagination } from "@triframe/utils-react";
import { from, isAnyFailure } from '@triframe/ambassador';
import { listEventTables, TableType } from '../../../api'
import { Seat } from "./Seat";

type TableAreaProps = BoxProps & {
    eventId: number
}

export function TableArea({ eventId, ...boxProps }: TableAreaProps) {
    const pagination = usePagination(10);

    const tables = pagination.useResult(listEventTables, eventId, {
        select: from(TableType)
            .id()
            .label()
            .capacity()
    })

    if (isLoading(tables)) return null;

    if (isAnyFailure(tables)) return null;

    return (
        <Box {...boxProps} padding={5} height="100%" overflowY="scroll">
            <SimpleGrid columns={3} spacing={2}>
                {tables.map( table => (
                    <Card>
                        <CardBody>
                            {table.label}
                            <VStack>
                                {new Array(table.capacity).fill(null).map( (_, i) => (
                                    <Seat eventId={eventId} tableId={table.id} seatNumber={i + 1 } />
                                ))}
                            </VStack>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    )
}