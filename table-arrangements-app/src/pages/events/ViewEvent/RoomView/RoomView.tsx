import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Checkbox, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { useState } from "react";
import { useEventEditor } from "../EventEditor"
import { Gridlines } from "./Gridlines";
import { RequiredSettingsForm } from "./RequiredSettingsForm";
import { RoomDisplay } from "./RoomDisplay";
import { DraggableTableDisplay, TableDisplay, TableWithObjectTemplate } from "./TableDisplay";
import { Sidebar } from "./Sidebar";
import { DraggableFixtureDisplay, FixtureDisplay } from "./FixtureDisplay";
import { FixtureBeingAdded } from "./FixtureDisplay/FixtureBeingAdded";
import { Fixture, isPlacedTable } from "../fields";

type DragState = { type: 'table', table: TableWithObjectTemplate } | { type: 'fixture', fixture: Fixture }

export function RoomView() {
    const editor = useEventEditor();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const [ dragged, setDragged ] = useState<DragState | null>(null);


    if (!editor.hasRequiredSettingsForRoomView) {
        return <RequiredSettingsForm />
    }

    function handleDragStart(e: DragStartEvent) {
        const dragged = e.active.data.current as DragState
        setDragged(dragged);
    }

    function handleDragEnd(e: DragEndEvent) {
        const fixtureRect = e.active.rect.current.translated
        const roomRect = e.over?.rect;
        if (!fixtureRect || !roomRect || !dragged) return;

        const x = editor.convertPixelsToBase(fixtureRect.left - roomRect.left);
        const y = editor.convertPixelsToBase(fixtureRect.top - roomRect.top);

        if (dragged.type === 'table') {
            if (!dragged.table.id) return;
            if (isPlacedTable(dragged.table)) {
                return editor.updateTable(dragged.table.id, { x, y });
            } else {
                return editor.placeTable(dragged.table.id, x, y);
            }
        }

        if (dragged.type === 'fixture') {
            if (!dragged.fixture.id) return;
            return editor.placeFixture(dragged.fixture.id, x, y);
        }
    }

    const room = editor.getScaledRoom();

    return (
        <Flex direction="column" height="100%">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={[ mouseSensor ]} >
                <Flex flex={1} height="100%">
                    <Sidebar />
                    <Box flex={1} p={4} overflow="hidden" position="relative" height="100%">
                        <RoomDisplay>
                            <Gridlines />
                            {room.tables.map( table => (
                                <DraggableTableDisplay key={table.id ?? 'new-table'} table={table} />
                            ))}
                            {room.fixtures.map( fixture => (
                                <DraggableFixtureDisplay key={fixture.id ?? 'new-fixture'} fixture={fixture} />
                            ))}
                            <FixtureBeingAdded />
                        </RoomDisplay>
                        <HStack position="absolute" bottom={4} left={4}  backgroundColor="white">
                            <ButtonGroup isAttached size="sm">
                                <Button  onClick={() => editor.zoomOut()}  >
                                    <MinusIcon />
                                </Button>
                                <Button  onClick={() => editor.zoomIn()} >
                                    <AddIcon />
                                </Button>
                            </ButtonGroup>
                            <Checkbox isChecked={editor.shouldShowGridlines} onChange={() => editor.toggleGridlines()}>
                                Gridlines
                            </Checkbox>
                        </HStack>
                    </Box>
                </Flex>
                <DragOverlay>
                    {dragged?.type === 'table' && dragged.table !== null &&
                        <TableDisplay table={dragged.table} inOverlay={true} />
                    }
                     {dragged?.type === 'fixture' && dragged.fixture !== null &&
                        <FixtureDisplay fixture={dragged.fixture} inOverlay={true} />
                    }
                </DragOverlay>
            </DndContext>
        </Flex>
    )
}