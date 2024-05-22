import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Center, Container, HStack} from "@chakra-ui/react";
import { isAnyFailure, isFailure } from "@triframe/ambassador";
import { isLoading, useForm } from "@triframe/utils-react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrganizationUser, UserRoles } from "../../../api";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText, UserForm, UserFormValues } from "../../../_shared";
import { useOrganization } from "../_shared";

const initialUserValues: UserFormValues = {
    id: undefined,
    role: UserRoles.user,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

export function CreateOrganizationUser() {
    const params = useParams();

    const organizationId = Number(params.organizationId);

    const organization = useOrganization(organizationId)

    const form = useForm(initialUserValues, async values => {
        const result = await createOrganizationUser(organizationId, { password: '', ...values })

        if (!isAnyFailure(result)) navigate(`/organizations/${organizationId}/edit`)

        return result;
    })

    const navigate = useNavigate();

    if (isFailure(organization, 'userUnauthorized')) {
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
                    Add {!isLoading(organization) && organization.name} User
                </NavBarText>
                <NavBarEnd>
                    <NavBarProfileControl />
                </NavBarEnd>
            </NavBar>
            <Container size="container.lg" mt={8}>
                <UserForm form={form} />
                <HStack justify="end" width="100%" mt={8}>
                    <Button leftIcon={<AddIcon />} onClick={() => form.save()} colorScheme="green">
                        Create User
                    </Button>
                </HStack>
            </Container>
        </>
    )
}
