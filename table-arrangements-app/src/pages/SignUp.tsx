import { Input, Center, Heading, Button, VStack, HStack, FormControl, FormLabel, FormErrorMessage, Flex } from "@chakra-ui/react";
import { Link } from '../_shared'
import { signUp } from '../api';
import { useState } from "react";
import { FailuresFrom, isAnyFailure, isFailure } from "@triframe/ambassador";
import { useNavigate } from "react-router-dom";

type SignUpOptions = Parameters<typeof signUp>[0]

type SignUpFailure = FailuresFrom<typeof signUp>;

export function SignUp() {
    const [ options, setOptions ] = useState<SignUpOptions>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [ failure, setFailure ] = useState<SignUpFailure | null>(null)

    const navigate = useNavigate();

    async function handleSignUp() {
        const result = await signUp(options);
        if (isAnyFailure(result)) setFailure(result)
        else navigate('/')
    }

    function setOption(key: keyof SignUpOptions, value: string) {
        setOptions({ ...options, [key]: value })
        setFailure(null);
    }

    return (
        <Center height="100vh">
            <VStack align="start" minWidth="50vw" spacing={4}>
                <Heading>Sign Up</Heading>
                <HStack width="100%">
                    <FormControl isInvalid={isFailure(failure, 'firstNameIsEmpty')} flex={1}>
                        <FormLabel>First Name</FormLabel>
                        <Input size='lg' placeholder="Enter your first name"
                            value={options.firstName}
                            onChange={e => setOption('firstName', e.target.value)}
                        />
                        <FormErrorMessage>
                            {isFailure(failure, 'firstNameIsEmpty') ? 'First Name is required'
                            : null}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={isFailure(failure, 'lastNameIsEmpty')} flex={1}>
                        <FormLabel>Last Name</FormLabel>
                        <Input size='lg' placeholder="Enter your last name"
                            value={options.lastName}
                            onChange={e => setOption('lastName', e.target.value)}
                        />
                        <FormErrorMessage>
                            {isFailure(failure, 'lastNameIsEmpty') ? 'Last Name is required'
                            : null}
                        </FormErrorMessage>
                    </FormControl>
                </HStack>
                <FormControl isInvalid={isFailure(failure, 'emailIsInUse') || isFailure(failure, 'emailIsInvalid')}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter your email address" size='lg'
                        value={options.email}
                        onChange={e => setOption('email', e.target.value)}
                    />
                    <FormErrorMessage>
                        {isFailure(failure, 'emailIsInvalid') ? 'Please enter a valid email' :
                         isFailure(failure, 'emailIsInUse') ? 'Email is in use'
                         : null}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={isFailure(failure, 'passwordTooShort')}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Enter your password' size='lg' type="password"
                        value={options.password}
                        onChange={e => setOption('password', e.target.value)}
                    />
                    <FormErrorMessage>
                        {isFailure(failure, 'passwordTooShort') ? 'Password must be 12 characters or longer' : null}
                    </FormErrorMessage>
                </FormControl>
                <HStack justify="end" width="100%">
                    <Button colorScheme="blue" onClick={handleSignUp}>Sign up</Button>
                    <Link to="/login">or, Log In</Link>
                </HStack>
            </VStack>
        </Center>
    )
}
