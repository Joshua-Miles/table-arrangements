import { SettingsIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardFooter, CardHeader, Center, FormControl, FormLabel, HStack, Select, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useEventEditor } from "../../_shared/EventEditor";
import { EventDetails } from "../../_shared/fields";
import { formatFixtureLabel } from "./formatFixtureLabel";
import { MeasurementInput } from "./MeasurementInput";

type FormValues = Pick<EventDetails, 'roomLength' | 'roomWidth' | 'defaultTableObjectTemplateId'>

export function RequiredSettingsForm() {
    const editor = useEventEditor();

    const objectTemplates = editor.getObjectTemplates();

    const [ values, setValues ] = useState<FormValues>({
        defaultTableObjectTemplateId: null,
        roomLength: editor.getRoomLength(),
        roomWidth: editor.getRoomWidth()
    })

    function handleSubmit() {
        editor.updateEvent({
            defaultTableObjectTemplateId: values.defaultTableObjectTemplateId,
            roomLength: values.roomLength,
            roomWidth: values.roomWidth
        })
    }

    return (
        <Center height="100%">
            <Card>
                <CardHeader alignItems="center" display="flex">
                    <SettingsIcon mr={2}/> Room Setup
                </CardHeader>
                <CardBody>
                    <VStack spacing={4}>
                        <HStack>
                            <FormControl>
                                <FormLabel>Room Length</FormLabel>
                                <MeasurementInput
                                    placeholder="30.25"
                                    value={values.roomLength}
                                    onChange={roomLength => setValues({ ...values, roomLength })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Room Width</FormLabel>
                                <MeasurementInput
                                    placeholder="100.50"
                                    value={values.roomWidth}
                                    onChange={roomWidth => setValues({ ...values, roomWidth })}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Default Table Size</FormLabel>
                            <Select placeholder="Select default table size" value={values.defaultTableObjectTemplateId ?? undefined} onChange={e => setValues({
                                ...values,
                                defaultTableObjectTemplateId: Number(e.target.value)
                            })}>
                                {objectTemplates.map( fixtureTemplate => (
                                    <option value={fixtureTemplate.id}>
                                        {formatFixtureLabel(fixtureTemplate, editor.defaultMeasurementSystem)}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </VStack>
                </CardBody>
                <CardFooter display="flex" justify="end">
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </Center>
    )
}
