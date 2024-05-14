import { Attendee, Party } from "../fields";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Input,
    Card,
    CardBody,
    VStack,
    Flex,
    IconButton,
    FormControl,
    FormLabel,
    HStack,
    InputGroup,
    InputRightAddon,
  } from '@chakra-ui/react'
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { inferPartyName } from "../inferPartyName";
import { useEventEditor } from "../EventEditor";
import { TagInput } from "./TagInput";

export type PartyModalProps = {
    party: Party | null,
    onSave: (party: Party) => void
    onCancel: () => void
    onDelete?: (party: Party) => void
}

export function PartyModal({ party, ...rest }: PartyModalProps) {
    return (
        <Modal isOpen={party !== null} onClose={() => void(0)}>
            <ModalOverlay />
            {party !== null && <PartyForm party={party} {...rest} />}
        </Modal>
    )
}

function PartyForm({ party, onSave, onDelete, onCancel }: PartyModalProps & { party: Party }) {
    const editor = useEventEditor();

    const [ values, setValues ] = useState(party);
    const [ newAttendeeName, setNewAttendeeName ] = useState<string | null>(party.id === undefined  ? '' : null);
    const newAttendeeNameInput = useRef<HTMLInputElement | null>(null);

    function handleKeydown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && newAttendeeName !== null) {
            setNewAttendeeName('')
            setValues({
                ...values,
                attendees: [
                    ...values.attendees,
                    {
                        id: undefined,
                        name: newAttendeeName,
                        tagId: null
                    }
                ]
            })
        }
    }

    function handleDelete(deletedAttendee: Attendee) {
        setValues({
            ...values,
            attendees: values.attendees.filter( attendee => attendee.id !== deletedAttendee.id )
        })
    }

    function handleSetTag(updatedAttendee: Attendee, tagId: number | null) {
        setValues({
            ...values,
            attendees: values.attendees.map( attendee =>
                attendee.id === updatedAttendee.id
                    ? { ...updatedAttendee, tagId }
                    : attendee
            )
        })
    }

    const tags = editor.getTags();

    return (
        <ModalContent>
            <ModalBody>
                <VStack spacing={4} align="stretch">
                    <FormControl flex={1}>
                        <FormLabel>Party</FormLabel>
                        <HStack spacing={1}>
                            <Input type="color" width={20} value={values.color} onChange={e => setValues({ ...values, color: e.target.value })} />
                            <InputGroup>
                                <Input flex={1}
                                    type="text"
                                    value={values.name}
                                    onChange={e => setValues({ ...values, name: e.target.value })}
                                    placeholder={inferPartyName(values)}
                                />
                                <InputRightAddon>
                                    Party
                                </InputRightAddon>
                            </InputGroup>
                        </HStack>
                    </FormControl>
                    <FormControl flex={1}>
                        <FormLabel>Attendees</FormLabel>
                        <VStack spacing={1} align="stretch">
                            {values.attendees.map( attendee => (
                                <Card>
                                    <CardBody p={2}>
                                        <Flex align="center">
                                            {attendee.name}
                                            <HStack flex={1} justifyContent="end">
                                                <TagInput value={attendee.tagId} onChange={tagId => handleSetTag(attendee, tagId)} tags={tags} eventId={editor.getEventId()} />
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<DeleteIcon />}
                                                    disabled={values.attendees.length === 1}
                                                    onClick={() => handleDelete(attendee)}
                                                />
                                            </HStack>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            ))}
                            {newAttendeeName === null
                                ? <Flex justify="end">
                                    <Button size="xs" leftIcon={<AddIcon />} colorScheme="blue" onClick={() => setNewAttendeeName('')} variant="ghost">
                                        Add Attendee
                                    </Button>
                                </Flex>
                                : <Input
                                    ref={newAttendeeNameInput}
                                    placeholder="Add Attendee"
                                    value={newAttendeeName}
                                    onChange={e => setNewAttendeeName(e.target.value)}
                                    onKeyDown={handleKeydown}
                                    onBlur={() => setNewAttendeeName(null)}
                                    autoFocus
                                />
                            }
                        </VStack>
                    </FormControl>
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Flex width="100%">
                    {onDelete &&
                        <Button colorScheme='red' mr={3} onClick={() => onDelete(party)} leftIcon={<DeleteIcon />}>
                            Delete
                        </Button>}
                    <Flex flex={1} justifyContent="flex-end">
                        <Button mr={3} onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={() => onSave(values)} disabled={party.attendees.length === 0}>
                            Save
                        </Button>
                    </Flex>
                </Flex>
            </ModalFooter>
        </ModalContent>
    )
}