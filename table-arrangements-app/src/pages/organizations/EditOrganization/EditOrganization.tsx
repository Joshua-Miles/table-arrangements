import { isLoading, useFormForResult, useResult } from "@triframe/utils-react";
import { FailuresFrom, from, isFailure } from '@triframe/ambassador';
import { useParams } from "react-router-dom";
import { getOrganization, OrganizationType, UserRoles } from "../../../api";
import { Center, Container, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText, useLoggedInUser } from "../../../_shared";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { updateOrganization } from "../../../api/updateOrganization";
import { UserTable } from "./UserTable";
import { useOrganization } from "../_shared";

export function EditOrganization() {
    const params = useParams();

    const organizationId = Number(params.organizationId);

    const user = useLoggedInUser();

    const organization = useOrganization(organizationId);

    const form = useFormForResult(getOrganization, organizationId, {
        select: from(OrganizationType)
            .name()
    })


    const { failure } = form.useSaveHandler( values =>  updateOrganization(organizationId, values))

    form.useAutosave(500);

    const [ organizationFormValues, setOrganizationFormValues ] = form.useState()

    if (isLoading(user) || !user || user.role < UserRoles.collaborator) return null;

    if (isFailure(organization, 'userUnauthorized')) {
        return (
            <Center>
                You are not authorized to manage this organization
            </Center>
        )
    }

    return (
        <>
            <NavBar>
                <NavBarIconButton
                    aria-label="Back"
                    icon={<ChevronLeftIcon />}
                    to={`/organizations/${organizationId}`}
                />
                <NavBarText>
                    {!isLoading(organization) && organization.name}
                </NavBarText>
                <NavBarEnd>
                    <NavBarProfileControl />
                </NavBarEnd>
            </NavBar>
            <Container maxWidth="container.lg">
                <VStack spacing={8} mt={8}>
                    { !isLoading(organizationFormValues) &&
                        <FormControl isInvalid={isFailure(failure, 'organizationNameIsEmpty')} flex={1}>
                            <FormLabel>Organization Name</FormLabel>
                            <Input size='lg' placeholder="Enter your organization name"
                                value={organizationFormValues.name}
                                onChange={e => setOrganizationFormValues({ ...organizationFormValues, name: e.target.value })}
                            />
                            <FormErrorMessage>
                                {isFailure(failure, 'organizationNameIsEmpty') ? 'Organization name is required'
                                : null}
                            </FormErrorMessage>
                        </FormControl>
                    }
                    <FormControl>
                        <FormLabel>Organization Users</FormLabel>
                        <UserTable organizationId={organizationId} />
                    </FormControl>
                </VStack>
            </Container>
        </>
    )
}