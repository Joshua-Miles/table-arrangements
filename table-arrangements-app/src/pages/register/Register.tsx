import { isLoading, useResult } from "@triframe/utils-react";
import { useParams } from "react-router-dom";
import { from } from '@triframe/ambassador'
import { EventRegistrationInfoType, getEventRegistrationInfo } from "../../api";
import { Center, Container, Fade, Flex, FormControl, FormLabel, Heading, HStack, Input, Skeleton, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RegistrationStepper } from "./RegistrationStepper";

const eventFields = from(EventRegistrationInfoType)
    .id()
    .name()
    .customFields( customField => (
        customField
            .id()
            .name()
            .orderby()
            .isRequired()
            .prompt()
            .scope()
            .type()
    ));


type RegistrationState = {
    primaryAttendeeName: string
}

const initialRegistrationState: RegistrationState = {
    primaryAttendeeName: ''
}


export function Register() {
    const params = useParams();

    const publicRegistrationKey = String(params.publicRegistrationKey);

    const event = useResult(getEventRegistrationInfo, publicRegistrationKey, { select: eventFields  })

    const [ registration, setRegistration ] = useState<RegistrationState>(initialRegistrationState)

    if (isLoading(event)) {
        return (
            <Center>
                <Skeleton>
                    <Heading>Event Title</Heading>
                </Skeleton>
            </Center>
        )
    }

    if (!event) return (
        <Center h="100%">
            <Heading>Event Not Found</Heading>
        </Center>
    )

    return (
        <>
            <Fade in={true}>
                <Center mt={16}>
                    <Heading>RSVP for {event.name}</Heading>
                </Center>
            </Fade>
            <Container maxWidth="container.xl" mt={16} flex={1}>
                <HStack spacing={16} align="stretch" h="100%">
                    <RegistrationStepper />
                    <VStack align="stretch" flex={1}>
                        <HStack>
                            <FormControl>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <Input
                                    value={registration.primaryAttendeeName}
                                    onChange={e => setRegistration({
                                        ...registration,
                                        primaryAttendeeName: e.target.value
                                    })}
                                />
                            </FormControl>
                        </HStack>
                    </VStack>
                </HStack>
            </Container>
        </>
    )
}