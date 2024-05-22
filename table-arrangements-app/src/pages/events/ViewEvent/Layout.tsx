import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, IconButton, Text } from "@chakra-ui/react";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText } from "../../../_shared";
import { AssignmentView } from "./AssignmentView";
import { useEventEditor } from "./EventEditor";
import { RoomView } from "./RoomView";

export function Layout() {
    const editor = useEventEditor();

    return (
        <>
            <NavBar>
                <NavBarIconButton
                    aria-label="Back"
                    icon={<ChevronLeftIcon />}
                    to={`/organizations/${editor.getOrganizationId()}`}
                />
                <NavBarText>{editor.getEventName()}</NavBarText>
                <NavBarEnd>
                    <NavBarProfileControl />
                </NavBarEnd>
            </NavBar>
            <Flex flex={1} direction="column" overflow="hidden">
                {editor.isAssignmentViewSelected && <AssignmentView />}
                {editor.isRoomViewSelected && <RoomView /> }
            </Flex>
            <ButtonGroup isAttached position="fixed" bottom={4} right={4} size="sm" backgroundColor="white">
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