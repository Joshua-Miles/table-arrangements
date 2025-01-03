import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, HStack, Input, Select, Switch, useDisclosure, VStack } from "@chakra-ui/react";
import { CustomField } from "../../_shared";

type CustomFieldCardProps = {
    value: CustomField
    onChange: (value: CustomField) => void
}

export function CustomFieldCard({ value, onChange }: CustomFieldCardProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Card w="100%">
            <CardBody>
                <VStack spacing={4} align="stretch">
                    <HStack>
                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select
                                value={value.type}
                                onChange={e => onChange({ ...value, type: e.target.value as 'text' | 'email' | 'phone' })}
                            >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Name</FormLabel>
                            <Input
                                value={value.name}
                                onChange={e => onChange({ ...value, name: e.target.value })}
                            />
                        </FormControl>
                    </HStack>
                    <Flex>
                        <Button size="xs" colorScheme="blue" variant="ghost" leftIcon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} onClick={isOpen ? onClose : onOpen}>
                            {isOpen ? 'Hide Public Registration Details' : 'Show Public Registration Details'}
                        </Button>
                    </Flex>
                    <VStack display={isOpen ? 'flex' : 'none'} spacing={4} align="stretch">
                        <Flex justify="start">
                            <HStack align="center">
                                <FormLabel m={0}>Is Required</FormLabel>
                                <Switch
                                    isChecked={value.isRequired}
                                    onChange={e => onChange({ ...value, isRequired: !value.isRequired })}
                                />
                            </HStack>
                        </Flex>
                        <FormControl>
                            <FormLabel>Prompt</FormLabel>
                            <Input
                                value={value.prompt}
                                onChange={e => onChange({ ...value, prompt: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Placeholder</FormLabel>
                            <Input
                                value={value.placeholder}
                                onChange={e => onChange({ ...value, placeholder: e.target.value })}
                            />
                        </FormControl>
                    </VStack>
                </VStack>
            </CardBody>
        </Card>
    )
}
