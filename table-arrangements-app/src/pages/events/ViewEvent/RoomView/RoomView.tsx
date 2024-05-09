import { Box, Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useEventEditor } from "../EventEditor"
import { DraggableFixtureDisplay } from "./DraggableFixtureDisplay";
import { FixtureDisplay, FixtureDisplayProps } from "./FixtureDisplay";
import { RequiredSettingsForm } from "./RequiredSettingsForm";
import { RoomDisplay } from "./RoomDisplay";
import { UnplacedTables } from "./UnplacedTables";

export function RoomView() {
    const editor = useEventEditor();

    const [ draggedFixtureProps, setDraggedFixtureProps ] = useState<FixtureDisplayProps | null>(null);

    if (!editor.hasRequiredSettingsForRoomView) {
        return <RequiredSettingsForm />
    }

    function handleDragStart(e: DragStartEvent) {
        const draggedFixtureProps = e.active.data.current as FixtureDisplayProps
        setDraggedFixtureProps(draggedFixtureProps);
    }

    function handleDragEnd(e: DragEndEvent) {
        const fixtureRect = e.active.rect.current.translated
        const roomRect = e.over?.rect;
        if (!fixtureRect || !roomRect || !draggedFixtureProps) return;

        const x = editor.convertPixelsToBase(fixtureRect.left - roomRect.left);
        const y = editor.convertPixelsToBase(fixtureRect.top - roomRect.top);

        if (draggedFixtureProps.fixtureId) return moveFixture();
        else if (draggedFixtureProps.tableId) return editor.placeTable(draggedFixtureProps.tableId, x, y);
    }

    function moveFixture() {

    }

    const fixtures = editor.getScaledFixturesWithLabels();

    console.log(fixtures)

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Flex height="100%">
                <UnplacedTables width="200px" />
                <Box flex={1} p={4}>
                    <RoomDisplay>
                        {fixtures.map( fixture => (
                            <DraggableFixtureDisplay
                                fixtureId={fixture.id}
                                label={fixture.label}
                                fixtureTemplateId={fixture.templateId}
                                x={fixture.x}
                                y={fixture.y}
                            />
                        ))}
                    </RoomDisplay>
                </Box>
            </Flex>
            <DragOverlay>
                {draggedFixtureProps !== null &&
                    <FixtureDisplay {...draggedFixtureProps} />
                }
            </DragOverlay>
        </DndContext>
    )
}