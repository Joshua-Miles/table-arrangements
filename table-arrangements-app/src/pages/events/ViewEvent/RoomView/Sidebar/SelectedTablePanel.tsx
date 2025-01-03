import { Card, CardBody, FormControl, FormLabel, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { useEventEditor } from "../../../_shared/EventEditor";
import { Table } from "../../../_shared/fields";
import { inferTableName } from "../../inferTableLabel";
import { MeasurementInput } from "../MeasurementInput";

type SelectedTablePanelProps = {
    table: Table
}

export function SelectedTablePanel({ table }: SelectedTablePanelProps) {
    const editor = useEventEditor();

    function updateTable(values: Partial<Table>) {
        if (!table.id) return;
        editor.updateTable(table.id, values);
    }

    return (
        <CardBody>
            <VStack spacing={6}>
                <FormControl>
                    <FormLabel>Table Number</FormLabel>
                    <Input type="number" value={table.number} onChange={e => updateTable({ number: Number(e.target.value) })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Label</FormLabel>
                    <Input placeholder={inferTableName(table, editor.getParties())} value={table.label ?? ''} onChange={e => updateTable({ label: e.target.value })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Color</FormLabel>
                    <Input type="color" value={table.color ?? '#000000'} onChange={e => updateTable({ color: e.target.value })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Length</FormLabel>
                    <MeasurementInput value={table.length} onChange={length => updateTable({ length })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Width</FormLabel>
                    <MeasurementInput value={table.width} onChange={width => updateTable({ width })} />
                </FormControl>
                <FormControl>
                    <FormLabel>X</FormLabel>
                    <MeasurementInput value={table.x} onChange={x => updateTable({ x })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Y</FormLabel>
                    <MeasurementInput value={table.y} onChange={y => updateTable({ y })} />
                </FormControl>
            </VStack>
        </CardBody>
    )
}