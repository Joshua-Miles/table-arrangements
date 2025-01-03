import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading, VStack } from "@chakra-ui/react";
import { CustomField, useEventEditor } from "../../_shared";
import { CustomFieldCard } from "./CustomFieldCard";

type CustomFieldsTabProps = {
    scope: 'party' | 'attendee'
}

export function CustomFieldsTab({ scope }: CustomFieldsTabProps) {
    const editor = useEventEditor();

    const fields = editor.getCustomFields(scope);

    function addCustomField() {
        const field: CustomField = {
            id: undefined,
            orderby: fields.length,
            scope: scope,
            name: '',
            type: 'text',
            prompt: '',
            placeholder: '',
            isRequired: false
        };
        editor.addCustomField(field)
    }

    if (fields.length === 0) {
        return (
            <Center h="100%" flexDirection="column">
                <Heading size="md" mb={4}>This event doesn't have any {scope} fields yet</Heading>
                <Button colorScheme="green" leftIcon={<AddIcon />} onClick={addCustomField}>
                    Add Field
                </Button>
            </Center>
        )
    }

    return (
        <VStack align="start">
            {fields.map( field => (
                <CustomFieldCard
                    value={field}
                    onChange={ values => field.id && editor.updateCustomField(field.id, values)}
                />
            ))}
            <Button variant="ghost" colorScheme="blue" leftIcon={<AddIcon />} onClick={addCustomField}>
                Add Field
            </Button>
        </VStack>
    )
}
