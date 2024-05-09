import { BoxProps, Card, VStack } from "@chakra-ui/react";
import { useEventEditor } from "../EventEditor";
import { DraggableTableDisplay } from "./TableDisplay";

export function UnplacedTables(props: BoxProps) {
    const editor = useEventEditor();

    const { shape, color, width, length } = editor.getScaledDefaultTableObjectTemplate();

    const unplacedTables = editor.getUnplacedTables();

    if (unplacedTables.length === 0) return null;

    return (
        <Card p={2} {...props} maxHeight="100%" overflow="scroll">
            <VStack align="center" spacing={10}>
                {unplacedTables.map( table => (
                    <DraggableTableDisplay
                        table={{
                            ...table,
                            shape,
                            color,
                            width,
                            length
                        }}
                    />
                ))}
            </VStack>
        </Card>
    )
}