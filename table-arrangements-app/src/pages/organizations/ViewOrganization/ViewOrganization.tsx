import { isLoading, useResult } from "@triframe/utils-react"
import { Navigate, useParams } from "react-router-dom"
import { OrganizationType, EventType, getOrganization, listOrganizationEvents, UserRoles } from "../../../api"
import { from, isFailure } from '@triframe/ambassador';
import { Button, Card, CardBody, Center, Container, Flex, VStack } from "@chakra-ui/react";
import { AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { useState } from "react";
import { CreateEventModal } from "./CreateEventModal";
import { Link } from 'react-router-dom'
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText, useLoggedInUser } from "../../../_shared";
import { useOrganization } from "../_shared";

export function ViewOrganization() {
    const params = useParams();

    const organizationId = Number(params.organizationId);

    const organization = useOrganization(organizationId);

    const events = useResult(listOrganizationEvents, organizationId, {
        select: from(EventType)
            .id()
            .name()
    })


    const loggedInUser = useLoggedInUser();

    const [ createEventModalIsOpen, setCreateEventModalIsOpen ] = useState(false);

    if (isLoading(organization) || isLoading(loggedInUser)) return null;

    if (isFailure(events, 'userUnauthorized') || isFailure(organization, 'userUnauthorized') || !loggedInUser) {
        return (
            <Center>
                You are not authorized to view events for this organization
            </Center>
        )
    }

    return (
        <>
            <NavBar>
                <NavBarText ml={8}>
                    {organization.name}
                </NavBarText>
                <NavBarEnd>
                    {loggedInUser.role >= UserRoles.admin &&
                        <NavBarIconButton
                            aria-label={`Edit Organization Settings`}
                            icon={<SettingsIcon />}
                            to={`/organizations/${organizationId}/edit`}
                        />
                    }
                    <NavBarProfileControl />
                </NavBarEnd>
            </NavBar>
            <Container maxWidth="container.lg">
                <VStack alignItems="stretch" spacing={2} mt={2}>
                    <Flex justifyContent="flex-end">
                        {loggedInUser.role >= UserRoles.collaborator &&
                            <Button leftIcon={<AddIcon />} colorScheme="green" onClick={() => setCreateEventModalIsOpen(true)}>
                                Add Event
                            </Button>
                        }
                    </Flex>
                    {!isLoading(events) && events.map( event => (
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
        </>
    )
}