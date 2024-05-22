import { Box, BoxProps, Button, Card, Center, Flex, Input, Text, useEditable, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Party } from '../../fields'
import { AddIcon } from "@chakra-ui/icons";
import { PartyModal } from "../PartyModal";
import { randomColor } from "./randomColor";
import { DraggablePartyCard } from "../DraggablePartCard";
import { useDroppable } from "@dnd-kit/core";
import { useEventEditor } from "../../EventEditor";

type PartyListProps = BoxProps & {
    eventId: number
    parties: Party[]
    onPartyAdded: (party: Party) => void
    onPartySelected: (party: Party) => void
}

export function PartyList({ eventId, onPartyAdded, onPartySelected, ...boxProps }: PartyListProps) {
    const editor = useEventEditor();

    const allParties = editor.getParties();

    const unplacedParties = editor.getUnplacedParties();

    const { setNodeRef } = useDroppable({
        id: `drop-target-unseat`,
        data: {
            tableId: null,
            orderby: 0
        },
    });

    const [ searchTerm, setSearchTerm ] = useState('');

    const [ newParty, setNewParty ] = useState<Party | null>(null);

    function handleAddParty() {
        setNewParty({
            id: undefined, tableId: null, name: '', attendees: [], orderby: null, color: randomColor()
        })
    }

    function handeNewPartySave(party: Party) {
        onPartyAdded(party)
        setNewParty(null)
    }

    function handleNewPartyCancel() {
        setNewParty(null)
    }

    const searchResults = unplacedParties.filter( party => (
        party.attendees.some(attendee => attendee.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ))

    return (
        <Card ref={setNodeRef} {...boxProps} padding={2} overflow="scroll">
            <Box>
            <   Input placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </Box>
            <Flex justify="flex-end" mb={6}>
                {!editor.isDisabled &&
                    <Button colorScheme="blue" variant="ghost" size="xs" leftIcon={<AddIcon />} onClick={handleAddParty}>
                        Add Party
                    </Button>
                }
            </Flex>
            <VStack align="stretch" spacing={8}>
                {searchResults.map( (party, i) => (
                    <DraggablePartyCard party={party} key={party.id ?? `new-${i}`} onPartySelected={onPartySelected} />
                ))}
            </VStack>
            <Center h="100%">
                {allParties.length === 0 ? <Text>Add a party to get started</Text>
                    : unplacedParties.length === 0 ? <Text>All parties have been placed!</Text>
                    : searchResults.length === 0 ? <Text>No parties match search "{searchTerm}"</Text>
                    : null
                }
            </Center>
            <PartyModal
                party={newParty}
                onSave={handeNewPartySave}
                onCancel={handleNewPartyCancel}
            />
        </Card>
    )
}
