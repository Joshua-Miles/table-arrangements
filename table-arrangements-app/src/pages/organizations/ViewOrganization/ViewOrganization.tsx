import { isLoading, useResult } from "@triframe/utils-react"
import { Navigate, useParams } from "react-router-dom"
import { OrganizationType, EventType, getOrganization, listOrganizationEvents } from "../../../api"
import { from, isFailure } from '@triframe/ambassador';
import { Button, Card, CardBody, Center, Container, Flex, VStack } from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from "react";
import { CreateEventModal } from "./CreateEventModal";
import { Link } from 'react-router-dom'
import { NavBar, NavBarIconButton, NavBarText } from "../../../_shared";
import { WorkspaceDrawer } from "../../../_shared/WorkspaceDrawer";

export function ViewOrganization() {
    const params = useParams();

    const organizationId = Number(params.organizationId);

    const organization = useResult(getOrganization, organizationId, {
        select: from(OrganizationType)
            .name()
    })

    const events = useResult(listOrganizationEvents, organizationId, {
        select: from(EventType)
            .id()
            .name()
    })

    const [ isWorkspaceDrawerOpen, setIsWorkspaceDrawerOpen ] = useState(false);

    const [ createEventModalIsOpen, setCreateEventModalIsOpen ] = useState(false);

    if (isLoading(events)  || isLoading(organization)) return null;

    if (isFailure(events, 'userUnauthorized') || isFailure(organization, 'userUnauthorized')) {
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
                    onClick={() => setIsWorkspaceDrawerOpen(true)}
                />
                <NavBarText>
                    {organization.name}
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
                    organizationId={organizationId}
                    isOpen={createEventModalIsOpen}
                    onClose={() => setCreateEventModalIsOpen(false)}
                />
            </Container>
            <WorkspaceDrawer isOpen={isWorkspaceDrawerOpen} onClose={() => setIsWorkspaceDrawerOpen(false)} />
        </>
    )
}