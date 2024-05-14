import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Box, Button, Card, CardBody, Flex, Input, InputGroup, InputRightAddon, Text, VStack } from "@chakra-ui/react";
import { Fragment, useState, FocusEvent} from "react";
import { DraggablePartyCard } from "../DraggablePartCard";
import { Party, Table } from "../../fields";
import { DropTarget } from "./DropTarget";
import { inferTableName } from "../../inferTableLabel";
import { useEventEditor } from "../../EventEditor";

type TableProps = {
    table: Table,
    parties: Party[]
    onPartySelected: (party: Party) => void;
}

export function Table({ table, parties, onPartySelected }: TableProps) {
    const editor = useEventEditor();

    const [ isEditingTableLabel, setIsEditingTableLabel ] = useState(false)

    const sortedParties = [ ...parties ]

    sortedParties.sort( (a, b) => (a.orderby ?? 0) - (b.orderby ?? 0))

    const totalAttendees = parties.reduce((total, party) => total + party.attendees.length, 0);

    let attendeeCounter = 0;

    function handleTableLabelInputBlur(e: FocusEvent<HTMLInputElement>) {
        if (!table.id) return;
        editor.updateTable(table.id, { label: e.target.value })
        setIsEditingTableLabel(false)
    }

    return (
        <Card key={table.id} borderColor={totalAttendees > table.capacity ? 'red' : undefined} borderStyle="solid" borderWidth={1}>
            <Box borderRadius={25} width={`40px`} height={`40px`} backgroundColor="green.500"  position="absolute" left={-3} top={-3} color="white" display="flex" justifyContent="center" alignItems="center" >
                {table.number}
            </Box>
            <CardBody>
                <Flex justifyContent="space-between">
                    {!isEditingTableLabel
                        ?<Button variant="ghost" colorScheme="blue" size="sm" onClick={() => setIsEditingTableLabel(true)}>
                            {inferTableName(table, editor.getParties())} Table
                        </Button>
                        : <InputGroup size="sm" width={200}>
                            <Input
                                type="text"
                                autoFocus
                                placeholder={inferTableName(table, editor.getParties())}
                                defaultValue={table.label ?? ''}
                                onBlur={handleTableLabelInputBlur}
                            />
                            <InputRightAddon>
                                Table
                            </InputRightAddon>
                        </InputGroup>
                    }
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