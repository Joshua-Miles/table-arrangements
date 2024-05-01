import { Input, Center, Heading, Button, VStack, HStack, FormControl, FormLabel, FormErrorMessage, Alert, AlertTitle } from "@chakra-ui/react";
import { FailuresFrom, isAnyFailure, isFailure } from "@triframe/ambassador";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { Link } from "../_shared";

type LoginOptions = Parameters<typeof login>[0]

type LoginFailure = FailuresFrom<typeof login>;

export function Login() {
    const [ options, setOptions ] = useState<LoginOptions>({
        email: '',
        password: ''
    })

    const [ failure, setFailure ] = useState<LoginFailure | null>(null)

    const navigate = useNavigate();

    async function handleLogin() {
        const result = await login(options);
        if (isAnyFailure(result)) setFailure(result)
        else navigate('/')
    }

    function setOption(key: keyof LoginOptions, value: string) {
        setOptions({ ...options, [key]: value })
        setFailure(null);
    }

    return (
        <Center height="100vh">
            <VStack align="start" minWidth="50vw">
                <Heading>Login</Heading>
                <FormControl isInvalid={isFailure(failure, 'emailIsInvalid') || isFailure(failure, 'invalidCredentials')}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter your email address" size='lg'
                        value={options.email}
                        onChange={e => setOption('email', e.target.value)}
                    />
                    <FormErrorMessage>
                        {isFailure(failure, 'emailIsInvalid') ? 'Please enter a valid email'
                         : null}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={isFailure(failure, 'passwordTooShort') || isFailure(failure, 'invalidCredentials')}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Enter your password' size='lg' type="password"
                        value={options.password}
                        onChange={e => setOption('password', e.target.value)}
                    />
                    <FormErrorMessage>
                        {isFailure(failure, 'passwordTooShort') ? 'Password must be 12 characters or longer' :
                         isFailure(failure, 'invalidCredentials') ? 'Could not find a user with the given email and password'
                         : null}
                    </FormErrorMessage>
                </FormControl>
                <HStack justify="end" width="100%">
                    <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
                    <Link to="/sign-up">or, Sign Up</Link>
                </HStack>
            </VStack>
        </Center>
    );
}
