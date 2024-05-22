import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Center, Container, Flex, Text } from "@chakra-ui/react";
import { isLoading, useForm } from "@triframe/utils-react";
import { updateOrganizationUser } from "../../api";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText, useLoggedInUser, UserForm, UserFormValues } from "../../_shared";

export function EditProfile() {
    const loggedInUser = useLoggedInUser();

    if (loggedInUser === null) return null;

    const formValues = loggedInUser  as UserFormValues;

    const form = useForm(formValues, async values => {
        if (isLoading(loggedInUser)) return;
        return await updateOrganizationUser(loggedInUser.organizationId, loggedInUser.id, values)
    })

    const failure = form.useFailure();

    const isSaved = form.useAutosave(500);

    if (!loggedInUser) {
        return (
            <Center>
                You are not authorized to view events for this organization
            </Center>
        )
    }

    if (isLoading(loggedInUser)) return null

    return (
        <>
            <NavBar>
                <NavBarIconButton
                    aria-label="Back"
                    icon={<ChevronLeftIcon />}
                    to={`/`}
                />
                <NavBarText>
                    Edit Profile
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