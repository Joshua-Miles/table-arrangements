import { BoxProps, Button, Card, Flex, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Party } from '../../fields'
import { AddIcon } from "@chakra-ui/icons";
import { PartyModal } from "../PartyModal";
import { randomColor } from "./randomColor";
import { DraggablePartyCard } from "../DraggablePartCard";
import { useDroppable } from "@dnd-kit/core";

type PartyListProps = BoxProps & {
    eventId: number
    parties: Party[]
    onPartyAdded: (party: Party) => void
    onPartySelected: (party: Party) => void
}

export function PartyList({ eventId, parties, onPartyAdded, onPartySelected, ...boxProps }: PartyListProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: `drop-target-unseat`,
        data: {
            tableId: null,
            orderby: 0
        },
    });

    const [ searchTerm, setNewSearchTerm ] = useState('');

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

    const searchResults = parties.filter( party => (
        party.attendees.some(attendee => attendee.name.includes(searchTerm))
    ))

    return (
        <Card ref={setNodeRef} {...boxProps} padding={2} overflow="scroll">
            <Input placeholder="Search" value={searchTerm} onChange={e => setNewSearchTerm(e.target.value)} />
            <Flex justify="flex-end" mb={6}>
                <Button colorScheme="blue" variant="ghost" size="xs" leftIcon={<AddIcon />} onClick={handleAddParty}>
                    Add Party
                </Button>
            </Flex>
            <VStack align="stretch">
                {searchResults.map( (party, i) => (
                    <DraggablePartyCard party={party} key={party.id ?? `new-${i}`} onPartySelected={onPartySelected} />
                ))}
            </VStack>
            <PartyModal
                party={newParty}
                onSave={handeNewPartySave}
                onCancel={handleNewPartyCancel}
            />
        </Card>
    )
}