import { Button, ButtonGroup } from "@chakra-ui/react";
import { AssignmentView } from "./AssignmentView";
import { useEventEditor } from "./EventEditor";
import { RoomView } from "./RoomView";

export function Layout() {
    const editor = useEventEditor();

    return (
        <>
            {editor.isAssignmentViewSelected && <AssignmentView />}
            {editor.isRoomViewSelected && <RoomView /> }
            <ButtonGroup isAttached position="fixed" bottom={4} right={4} size="sm">
                <Button colorScheme="blue" onClick={() => editor.setView('assignments')} variant={editor.isAssignmentViewSelected ? 'solid' : 'outline'} >
                    Assignment View
                </Button>
                <Button colorScheme="blue" onClick={() => editor.setView('room')} variant={editor.isRoomViewSelected ? 'solid' : 'outline'}>
                    Room View
                </Button>
            </ButtonGroup>
        </>
    )
}