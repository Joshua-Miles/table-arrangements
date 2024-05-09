import { BoxProps, Card, VStack } from "@chakra-ui/react";
import { useEventEditor } from "../EventEditor";
import { DraggableFixtureDisplay } from "./DraggableFixtureDisplay";



export function UnplacedTables(props: BoxProps) {
    const editor = useEventEditor();

    const defaultTableFixtureTemplateId = editor.getDefaultTableFixtureTemplateId();

    if (defaultTableFixtureTemplateId === null) throw Error(`Tried to render UnplacedTables before defining a "defaultTableFixtureTemplateId"`)

    const tables = editor.getTables();

    const unplacedTables = tables.filter( table => table.fixtureId === null);

    return (
        <Card p={2} {...props} maxHeight="100%" overflow="scroll">
            <VStack align="center" spacing={10}>
                {unplacedTables.map( table => (
                    <DraggableFixtureDisplay fixtureTemplateId={defaultTableFixtureTemplateId} label={table.label} tableId={table.id} />
                ))}
            </VStack>
        </Card>
    )
}