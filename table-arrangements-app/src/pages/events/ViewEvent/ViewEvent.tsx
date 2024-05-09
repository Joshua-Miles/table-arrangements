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

    const form = useFormForResult(getEventDetails, eventId, { select: eventDetailFields })

    const [ event, setEvent ] = form.useState();

    const { failure } = form.useSaveHandler(async (event) => {
        if (isAnyFailure(event)) return;
        return await updateEventDetails(eventId, event);
    })

    const isSaving = form.useAutosave(500)


    if (isLoading(event) || isAnyFailure(event)) return null

    return (
        <EventEditorProvider eventDetails={event} setEventDetails={setEvent}>
           <Layout />
        </EventEditorProvider>
    )
}
