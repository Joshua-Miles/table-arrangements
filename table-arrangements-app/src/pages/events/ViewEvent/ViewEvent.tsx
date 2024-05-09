import { from, isAnyFailure, isFailure, OptionalSerials, Unreflect } from '@triframe/ambassador'
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { isLoading, useFormForResult } from "@triframe/utils-react";
import { useParams } from "react-router-dom";
import { getEventDetails, updateEventDetails } from "../../../api";
import { eventDetailFields } from './fields';
import { EventEditorProvider } from './EventEditor';
import { AssignmentView } from './AssignmentView';
import { Layout } from './Layout';


export function ViewEvent () {
    const params = useParams();

    const eventId = Number(params.eventId);

    return (
        <EventEditorProvider eventId={eventId}>
           <Layout />
        </EventEditorProvider>
    )
}
