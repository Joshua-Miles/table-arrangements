import { useParams } from "react-router-dom";
import { EventEditorProvider } from '../_shared/EventEditor';
import { ChevronLeftIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, Icon } from "@chakra-ui/react";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText } from "../../../_shared";
import { BiShareAlt } from "react-icons/bi";
import { AssignmentView } from "./AssignmentView";
import { useEventEditor } from "../_shared/EventEditor";
import { RoomView } from "./RoomView";
import { PublicRegistrationModal } from "./PublicRegistrationModal";
import { useState } from "react";

export function ViewEvent () {
    const params = useParams();

    const eventId = Number(params.eventId);

    return (
        <EventEditorProvider eventId={eventId}>
           <PageContent />
        </EventEditorProvider>
    )
}


// Primary content of the page is in a child compoent with
//  access to the editor
function PageContent() {
    const editor = useEventEditor();

    const [ isPublicRegistrationModalOpen, setIsPublicRegistrationModaOpen ] = useState(false);

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
                    {!editor.isDisabled &&
                        <>
                            <NavBarIconButton
                                aria-label="Share"
                                icon={<Icon as={BiShareAlt} />}
                                onClick={() => setIsPublicRegistrationModaOpen(true)}
                            />
                            <NavBarIconButton
                                aria-label="Settings"
                                icon={<SettingsIcon />}
                                to={`/events/${editor.getEventId()}/settings`}
                            />
                        </>
                    }
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
            <PublicRegistrationModal
                isOpen={isPublicRegistrationModalOpen}
                onClose={() => setIsPublicRegistrationModaOpen(false)}
            />
        </>
    )
}
