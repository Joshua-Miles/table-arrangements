import { isLoading, useResult } from "@triframe/utils-react"
import { Navigate, useParams } from "react-router-dom"
import { getWorkspaceDetails, listWorkspaceEvents, WorkspaceDetailsType, EventType } from "../../../api"
import { from, isFailure } from '@triframe/ambassador';
import { Button, Card, CardBody, Center, Container, Flex, MenuIcon, VStack } from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from "react";
import { CreateEventModal } from "./CreateEventModal";
import { Link } from 'react-router-dom'
import { inferWorkspaceName, NavBar, NavBarIconButton, NavBarProfileControl, NavBarText } from "../../../_shared";

export function ViewWorkspace() {
    const params = useParams();

    const workspaceId = Number(params.workspaceId);

    const workspace = useResult(getWorkspaceDetails, workspaceId, {
        select: from(WorkspaceDetailsType)
            .name()
            .creator( creator => (
                creator
                    .firstName()
            ))
    })

    const events = useResult(listWorkspaceEvents, workspaceId, {
        select: from(EventType)
            .id()
            .name()
    })

    const [ createEventModalIsOpen, setCreateEventModalIsOpen ] = useState(false);

    if (isLoading(events)  || isLoading(workspace)) return null;

    if (isFailure(events, 'userUnauthorized') || isFailure(workspace, 'userUnauthorized')) {
        return (
            <Center>
                You are not authorized to view events for this workspace
            </Center>
        )
    }

    return (
        <>
            <NavBar>
                <NavBarIconButton
                    aria-label="Menu"
                    icon={<HamburgerIcon />}
                />
                <NavBarText>
                    {inferWorkspaceName(workspace)}
                </NavBarText>
            </NavBar>
            <Container maxWidth="container.lg">
                <VStack alignItems="stretch" spacing={2} mt={2}>
                    <Flex justifyContent="flex-end">
                        <Button leftIcon={<AddIcon />} colorScheme="green" onClick={() => setCreateEventModalIsOpen(true)}>
                            Add Event
                        </Button>
                    </Flex>
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
        </>
    )
}