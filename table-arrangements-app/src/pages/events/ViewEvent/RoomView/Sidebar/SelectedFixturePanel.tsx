import { DeleteIcon } from "@chakra-ui/icons";
import { Button, CardBody, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useEventEditor } from "../../EventEditor";
import { Fixture } from "../../fields";
import { MeasurementInput } from "../MeasurementInput";

type SelectedFixturePanelProps = {
    fixture: Fixture
}

export function SelectedFixturePanel({ fixture }: SelectedFixturePanelProps) {
    const editor = useEventEditor();

    function updateFixture(values: Partial<Fixture>) {
        if (!fixture.id) return;
        editor.updateFixture(fixture.id, values);
    }

    function deleteFixture() {
        if (!fixture.id) return;
        editor.deleteFixture(fixture)
    }

    return (
        <CardBody>
            <VStack spacing={6}>
                <FormControl>
                    <FormLabel>Label</FormLabel>
                    <Input placeholder="Enter a label" value={fixture.label ?? ''} onChange={e => updateFixture({ label: e.target.value })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Color</FormLabel>
                    <Input type="color" value={fixture.color} onChange={e => updateFixture({ color: e.target.value })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Length</FormLabel>
                    <MeasurementInput value={fixture.length} onChange={length => updateFixture({ length })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Width</FormLabel>
                    <MeasurementInput value={fixture.width} onChange={width => updateFixture({ width })} />
                </FormControl>
                <FormControl>
                    <FormLabel>X</FormLabel>
                    <MeasurementInput value={fixture.x} onChange={x => updateFixture({ x })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Y</FormLabel>
                    <MeasurementInput value={fixture.y} onChange={y => updateFixture({ y })} />
                </FormControl>
                <Button variant="outline" colorScheme="red" leftIcon={<DeleteIcon />} w="100%" onClick={deleteFixture}>
                    Delete
                </Button>
            </VStack>
        </CardBody>
    )
}