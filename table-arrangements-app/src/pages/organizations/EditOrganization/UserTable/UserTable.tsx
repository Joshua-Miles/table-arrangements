import { isLoading, useResult } from "@triframe/utils-react"
import { from, isAnyFailure } from "@triframe/ambassador";
import { listOrganizationUsers, UserType } from "../../../../api"
import { Button, Card, CardBody, Flex, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export type UserTableProps = {
    organizationId: number
}

export function UserTable({ organizationId }: UserTableProps) {

    const users = useResult(listOrganizationUsers, organizationId, {
        select: from(UserType)
            .id()
            .firstName()
            .lastName()
    })

    if (isAnyFailure(users)) return null;

    return (
        <>
            <Flex justify="end">
                <Button as={Link} to={`/organizations/${organizationId}/users/new`} leftIcon={<AddIcon />} colorScheme="green">
                    Add User
                </Button>
            </Flex>
            <VStack align="stretch" mt={2}>
                {!isLoading(users) && users.map( user => (
                    <Card key={user.id} as={Link} to={`/organizations/${organizationId}/users/${user.id}/edit`} >
                        <CardBody>
                            {user.firstName} {user.lastName}
                        </CardBody>
                    </Card>
                ))}
            </VStack>
        </>
    )
}
