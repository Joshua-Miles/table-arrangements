import { CheckIcon } from "@chakra-ui/icons";
import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Select, Text, VStack } from "@chakra-ui/react";
import { FailuresFrom, isFailure } from "@triframe/ambassador";
import { Form, isLoading } from "@triframe/utils-react";
import { useEffect, useState } from "react";
import { updateOrganizationUser, UserRoles } from "../api";
import { useLoggedInUser } from ".";

export type UserFormValues = Parameters<typeof updateOrganizationUser>[2] & {
    id: number | undefined
};

type UserFailures = FailuresFrom<typeof updateOrganizationUser>

type UserFormProps = {
    form: Form<UserFormValues, UserFailures>
}

export function UserForm({ form }: UserFormProps) {
    const loggedInUser = useLoggedInUser();

    const [ user, setUser ] = form.useState();

    const failure = form.useFailure();

    if (isLoading(user) || isLoading(loggedInUser)) return null;

    return (
        <VStack align="start" spacing={4}>
            <HStack width="100%" align="top">
                <FormControl isInvalid={isFailure(failure, 'firstNameIsEmpty')} flex={1}>
                    <FormLabel>First Name</FormLabel>
                    <Input size='lg' placeholder="Enter user first name"
                        value={user.firstName}
                        onChange={e => setUser({ ...user, firstName: e.target.value })}
                    />
                    <FormErrorMessage>
                        {isFailure(failure, 'firstNameIsEmpty') ? 'First Name is required'
                        : '-'}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={isFailure(failure, 'lastNameIsEmpty')} flex={1}>
                    <FormLabel>Last Name</FormLabel>
                    <Input size='lg' placeholder="Enter user last name"
                        value={user.lastName}
                        onChange={e => setUser({ ...user, lastName: e.target.value })}
                    />
                    <FormErrorMessage>
                        {isFailure(failure, 'lastNameIsEmpty') ? 'Last Name is required'
                        : null}
                    </FormErrorMessage>
                </FormControl>
            </HStack>
            {/* Don't let the user edit their own role and accidentally disable change their own access permissions to the current page */}
            <FormControl isDisabled={user.id === loggedInUser?.id}>
                <FormLabel>Role</FormLabel>
                <Select value={user.role} onChange={e => setUser({ ...user, role: Number(e.target.value) })}>
                    <option value={UserRoles.user}>User</option>
                    <option value={UserRoles.collaborator}>Collaborator</option>
                    <option value={UserRoles.admin}>Admin</option>
                </Select>
                <FormHelperText h={8}>
                    {user.id === loggedInUser?.id ? 'You cannot edit your own role' :
                    user.role === UserRoles.user ? 'Users have readonly access to all of your organization\'s events' :
                    user.role === UserRoles.collaborator ? 'Collaborators have read and write access to your organization\'s events, but not other organization settings (like users)' :
                    user.role === UserRoles.admin ? 'Admins have read and write access to all of your organization\'s events and settings' : null}
                </FormHelperText>
            </FormControl>
            <FormControl isInvalid={isFailure(failure, 'emailIsInUse') || isFailure(failure, 'emailIsInvalid')}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter user email address" size='lg'
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                />
                <FormErrorMessage>
                    {isFailure(failure, 'emailIsInvalid') ? 'Please enter a valid email' :
                    isFailure(failure, 'emailIsInUse') ? 'Email is in use'
                    : null}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isFailure(failure, 'passwordTooShort')}>
                <FormLabel>Password</FormLabel>
                <PasswordInput
                    value={user.password}
                    onChange={password => setUser({ ...user, password })}
                />
                <FormErrorMessage>
                    {isFailure(failure, 'passwordTooShort') ? 'Password must be 12 characters or longer' : null}
                </FormErrorMessage>
            </FormControl>
        </VStack>
    )
}

// We don't keep the password in the form state when editing an existing user, so we'll keep a local copy here
function PasswordInput({ value, onChange }: { value?: string, onChange: (value: string) => void}) {
    const [ password, setPassword ] = useState(value ?? '');

    return  (
        <InputGroup size='lg'>
            <Input placeholder={value === undefined ? '(Unchanged)' : 'Enter user password'} type="password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value)
                    onChange(e.target.value)
                }}
            />
        </InputGroup>
    )
}
