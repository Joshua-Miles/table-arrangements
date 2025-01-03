import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Container, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { NavBar, NavBarEnd, NavBarIconButton, NavBarProfileControl, NavBarText } from "../../../_shared";
import { EventEditorProvider, useEventEditor } from "../_shared";
import { CustomFieldsTab } from "./CustomFieldsTab";

export function ViewEventSettings() {
    const params = useParams();

    const eventId = Number(params.eventId);

    return (
        <EventEditorProvider eventId={eventId}>
           <PageContent />
        </EventEditorProvider>
    )
}

function PageContent() {
    const editor = useEventEditor();

    return (
        <>
            <NavBar>
                <NavBarIconButton
                    aria-label="Back"
                    icon={<ChevronLeftIcon />}
                    to={`/events/${editor.getEventId()}`}
                />
                <HStack spacing={2} >
                    <NavBarText>{editor.getEventName()}</NavBarText>
                    <NavBarText>/</NavBarText>
                    <NavBarText>Settings</NavBarText>
                </HStack>
                <NavBarEnd>
                    <NavBarProfileControl />
                </NavBarEnd>
            </NavBar>
            <Container maxWidth="container.xl" mt={8} flex={1} overflow="scroll">
                <Tabs variant='enclosed' h="100%" display="flex" flexDirection="column">
                    <TabList>
                        {SettingTabs.map( tab => (
                            <Tab>{tab.name}</Tab>
                        ))}
                    </TabList>
                    <TabPanels flex={1} >
                        {SettingTabs.map( tab => (
                            <TabPanel h="100%" >{tab.component}</TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Container>
        </>
    )
}

const SettingTabs = [
    {
        name: 'Party Fields',
        component: <CustomFieldsTab scope="party" />
    },
    {
        name: 'Attendee Fields',
        component: <CustomFieldsTab scope="attendee" />
    }
]
