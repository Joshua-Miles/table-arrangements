import { Alert, AlertDescription, AlertIcon, AlertTitle, Card, CardBody, Flex, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react";
import { DraggablePartyCard } from "../DraggablePartCard";
import { Party, Table } from "../../fields";
import { DropTarget } from "./DropTarget";

type TableProps = {
    table: Table,
    parties: Party[]
    onPartySelected: (party: Party) => void;
}

export function Table({ table, parties, onPartySelected }: TableProps) {

    const sortedParties = [ ...parties ]

    sortedParties.sort( (a, b) => (a.orderby ?? 0) - (b.orderby ?? 0))

    const totalAttendees = parties.reduce((total, party) => total + party.attendees.length, 0);

    let attendeeCounter = 0;

    return (
        <Card key={table.id} borderColor={totalAttendees > table.capacity ? 'red' : undefined} borderStyle="solid" borderWidth={1}>
            <CardBody>
                <Flex justifyContent="space-between">
                    {table.label}
                    <Text color="gray.500">{totalAttendees} / {table.capacity}</Text>
                </Flex>
                {totalAttendees > table.capacity && (
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Table is over capacity!</AlertTitle>
                        <AlertDescription></AlertDescription>
                    </Alert>
                )}
                <VStack spacing={2} justify="stretch">
                    {table.id && <DropTarget tableId={table.id} orderby={0} />}
                    {sortedParties.map( (party, index) => {
                        let count = attendeeCounter;
                        attendeeCounter += party.attendees.length;
                        return (
                            <Fragment key={party.id}>
                                <DraggablePartyCard party={party} showIndex={true} indexOffset={count} onPartySelected={onPartySelected} />
                                {table.id && <DropTarget tableId={table.id} orderby={index + 1} />}
                            </Fragment>
                        )
                    })}
                </VStack>
            </CardBody>
        </Card>
    )
}