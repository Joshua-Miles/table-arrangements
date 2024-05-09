import { Box, Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useEventEditor } from "../EventEditor"
import { RequiredSettingsForm } from "./RequiredSettingsForm";
import { RoomDisplay } from "./RoomDisplay";
import { DraggableTableDisplay, TableDisplay, TableWithObjectTemplate } from "./TableDisplay";
import { UnplacedTables } from "./UnplacedTables";

export function RoomView() {
    const editor = useEventEditor();

    const [ draggedTable, setDraggedTable ] = useState<TableWithObjectTemplate | null>(null);

    if (!editor.hasRequiredSettingsForRoomView) {
        return <RequiredSettingsForm />
    }

    function handleDragStart(e: DragStartEvent) {
        const draggedTable = e.active.data.current as TableWithObjectTemplate
        setDraggedTable(draggedTable);
    }

    function handleDragEnd(e: DragEndEvent) {
        const fixtureRect = e.active.rect.current.translated
        const roomRect = e.over?.rect;
        if (!fixtureRect || !roomRect || !draggedTable || !draggedTable.id) return;

        const x = editor.convertPixelsToBase(fixtureRect.left - roomRect.left);
        const y = editor.convertPixelsToBase(fixtureRect.top - roomRect.top);

        return editor.placeTable(draggedTable.id, x, y);
    }

    function moveFixture() {

    }

    const room = editor.getScaledRoom();


    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Flex height="100%">
                <UnplacedTables width="200px" />
                <Box flex={1} p={4}>
                    <RoomDisplay>
                        {room.tables.map( table => (
                            <DraggableTableDisplay table={table} />
                        ))}
                    </RoomDisplay>
                </Box>
            </Flex>
            <DragOverlay>
                {draggedTable !== null &&
                    <TableDisplay table={draggedTable} />
                }
            </DragOverlay>
        </DndContext>
    )
}