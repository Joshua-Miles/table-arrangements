import { isLoading, useResult } from "@triframe/utils-react"
import { Navigate, useParams } from "react-router-dom"
import { listWorkspaceEvents, EventType } from "../../../api"
import { from, isFailure } from '@triframe/ambassador';
import { Button, Card, CardBody, Center, Container, Flex, VStack } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { useState } from "react";
import { CreateEventModal } from "./CreateEventModal";
import { Link } from 'react-router-dom'

export function ViewWorkspace() {
    const params = useParams();

    const workspaceId = Number(params.workspaceId);

    const events = useResult(listWorkspaceEvents, workspaceId, {
        select: from(EventType)
            .id()
            .name()
    })

    const [ createEventModalIsOpen, setCreateEventModalIsOpen ] = useState(false);

    if (isLoading(events)) return null;

    if (isFailure(events, 'userUnauthorized')) {
        return (
            <Center>
                You are not authorized to view events for this workspace
            </Center>
        )
    }

    return (
        <Container maxWidth="container.lg">
            <Flex justifyContent="flex-end">
                <Button leftIcon={<AddIcon />} colorScheme="green" onClick={() => setCreateEventModalIsOpen(true)}>
                    Add Event
                </Button>
            </Flex>
            <VStack alignItems="stretch">
                {events.map( event => (
                    <Link to={`/events/${event.id}`}>
                        <Card>
                            <CardBody>
                                {event.name}
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </VStack>
            <CreateEventModal
                workspaceId={workspaceId}
                isOpen={createEventModalIsOpen}
                onClose={() => setCreateEventModalIsOpen(false)}
            />
        </Container>
    )
}