import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Center, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { FailuresIn, from, isAnyFailure, isFailure } from "@triframe/ambassador";
import { Form, isLoading, useForm, useResult } from "@triframe/utils-react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrganizationUser, updateOrganizationUser, UserRoles, UserType } from "../../../api";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText, UserForm } from "../../../_shared";
import { useOrganization } from "../_shared";


export function EditOrganizationUser() {
    const params = useParams();

    const organizationId = Number(params.organizationId);

    const userId = Number(params.userId);

    const organization = useOrganization(organizationId)

    const user = useResult(getOrganizationUser, organizationId, userId, {
        select: from(UserType)
            .firstName()
            .lastName()
            .role()
            .email()
            .id()
    })

    const form = useForm(user, async values => {
        return await updateOrganizationUser(organizationId, userId, values)
    })

    const failure = form.useFailure();

    const isSaved = form.useAutosave(500);

    if (isFailure(organization, 'userUnauthorized') || isAnyFailure(user)) {
        return (
            <Center>
                You are not authorized to view events for this organization
            </Center>
        )
    }

    return (
        <>
            <NavBar>
                <NavBarIconButton
                    aria-label="Back"
                    icon={<ChevronLeftIcon />}
                    to={`/organizations/${organizationId}/edit`}
                />
                <NavBarText>
                    Edit {!isLoading(user) && `${user.firstName} ${user.lastName}`}
                </NavBarText>
                <NavBarEnd>
                    <NavBarProfileControl />
                </NavBarEnd>
            </NavBar>
            <Container size="container.lg" mt={8}>
                <Flex justify="end">
                    {failure !== null ? <Text color="red.300">Fix Errors</Text>
                     : isSaved ? <Text color="gray.500">Saved</Text>
                     : <Text color="gray.500">Saving</Text>
                    }
                </Flex>
                <UserForm form={form} />
            </Container>
        </>
    )
}
