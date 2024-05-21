import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FailuresFrom, isAnyFailure, isFailure } from "@triframe/ambassador";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrganizationEvent } from "../../../api";

type CreateEventModalProps = {
    organizationId: number
    isOpen: boolean
    onClose: () => void
};

type CreateEventOptions = Parameters<typeof createOrganizationEvent>[1]

type CreateEventFailure = FailuresFrom<typeof createOrganizationEvent>;

export function CreateEventModal({ organizationId, isOpen, onClose }: CreateEventModalProps) {

    const [ options, setOptions ] = useState<CreateEventOptions>({
        name: '',
        numberOfTables: null,
        tableCapacity: null
    })

    const [ failure, setFailure ] = useState<CreateEventFailure | null>(null);

    const navigate = useNavigate();

    function setOption<K extends keyof CreateEventOptions>(key: K, value: CreateEventOptions[K]) {
        setOptions({ ...options, [key]: value })
        setFailure(null);
    }

    async function handleAddEvent() {
        const result = await createOrganizationEvent(organizationId, options)
        if (isAnyFailure(result)) return setFailure(result);
        navigate(`/events/${result.id}`);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <VStack spacing={6}>
                        <FormControl isInvalid={isFailure(failure, 'nameCannotBeEmpty')}>
                            <FormLabel>Event Name</FormLabel>
                            <Input placeholder="Enter event name" size='lg'
                                value={options.name}
                                onChange={e => setOption('name', e.target.value)}
                            />
                            <FormErrorMessage>
                                {isFailure(failure, 'nameCannotBeEmpty') ? 'Please enter a valid name'
                                    : null}
                            </FormErrorMessage>
                        </FormControl>
                        <HStack spacing={2}>
                            <FormControl>
                                <FormLabel>Number of Tables</FormLabel>
                                <Input placeholder="Enter a number" size='lg'
                                    value={options.numberOfTables ?? ''}
                                    onChange={e => setOption('numberOfTables', Number(e.target.value))}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Table Capacity</FormLabel>
                                <Input placeholder="Enter a number" size='lg'
                                    value={options.tableCapacity ?? ''}
                                    type="number"
                                    onChange={e => setOption('tableCapacity', Number(e.target.value))}
                                />
                            </FormControl>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                <Button colorScheme="green" leftIcon={<AddIcon />} onClick={handleAddEvent}>
                    Add Event
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
