import { SettingsIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardFooter, CardHeader, Center, FormControl, FormLabel, HStack, Select, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useEventEditor } from "../EventEditor";
import { EventDetails } from "../fields";
import { formatFixtureLabel } from "./formatFixtureLabel";
import { MeasurementInput } from "./MeasurementInput";

type FormValues = Pick<EventDetails, 'roomLength' | 'roomWidth' | 'defaultTableFixtureTemplateId'>

export function RequiredSettingsForm() {
    const editor = useEventEditor();

    const fixtureTemplates = editor.getFixtureTemplates();

    const [ values, setValues ] = useState<FormValues>({
        defaultTableFixtureTemplateId: null,
        roomLength: editor.getRoomLength(),
        roomWidth: editor.getRoomWidth()
    })

    function handleSubmit() {
        editor.updateEvent({
            defaultTableFixtureTemplateId: values.defaultTableFixtureTemplateId,
            roomLength: values.roomLength,
            roomWidth: values.roomWidth
        })
    }

    console.log(fixtureTemplates)

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
                                <FormLabel>Room Width</FormLabel>
                                <MeasurementInput
                                    placeholder="100.50"
                                    value={values.roomWidth}
                                    onChange={roomWidth => setValues({ ...values, roomWidth })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Room Length</FormLabel>
                                <MeasurementInput
                                    placeholder="30.25"
                                    value={values.roomLength}
                                    onChange={roomLength => setValues({ ...values, roomLength })}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Default Table Size</FormLabel>
                            <Select value={values.defaultTableFixtureTemplateId ?? undefined} onChange={e => setValues({
                                ...values,
                                defaultTableFixtureTemplateId: Number(e.target.value)
                            })}>
                                {fixtureTemplates.map( fixtureTemplate => (
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
