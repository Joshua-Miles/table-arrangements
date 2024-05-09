import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useFormForResult, useResult } from "@triframe/utils-react";
import { createContext, useContext, useState } from "react";
import { getEventDetails, listEventObjectTemplates, updateEventDetails } from "../../../api";
import { eventDetailFields, EventDetails, Fixture, isPlacedTable, ObjectTemplate, objectTemplateFields, PlacedTable, Table } from "./fields"
import { MeasurementSystem, UnitOfMeasure } from "./UnitOfMeasure";


class EventEditor {
    private objectTemplates: ObjectTemplate[];
    private eventDetails: EventDetails
    private setEventDetails: (eventDetails: EventDetails) => void

    private editorState: EditorState
    private setEditorState: (editorState: EditorState) => void

    constructor(
        objectTemplates: ObjectTemplate[],
        eventDetails: EventDetails,
        setEventDetails: (eventDetails: EventDetails) => void,
        editorState: EditorState,
        setEditorState: (EditorState: EditorState) => void
    ) {
        this.objectTemplates = objectTemplates;
        this.eventDetails = eventDetails;
        this.setEventDetails = setEventDetails;
        this.editorState = editorState;
        this.setEditorState = setEditorState;
    }

    get isAssignmentViewSelected() {
        return this.editorState.view === 'assignments';
    }

    get isRoomViewSelected() {
        return this.editorState.view === 'room';
    }

    get hasRequiredSettingsForRoomView() {
        const { roomWidth, roomLength, defaultTableObjectTemplateId } = this.eventDetails;
        return (
            roomWidth !== null && roomLength !== null && defaultTableObjectTemplateId !== null
        )
    }

    get defaultMeasurementSystem(): MeasurementSystem {
        return 'imperial'
    }

    setView(view: EditorState['view']) {
        this.setEditorState({
            ...this.editorState,
            view
        })
    }

    setScale(scale: number) {
        this.setEditorState({
            ...this.editorState,
            scale
        })
    }

    convertPixelsToBase(pixels: number) {
        return pixels / this.editorState.scale;
    }

    convertBaseToPixles(measurement: number) {
        return measurement * this.editorState.scale;
    }

    updateEvent(event: Partial<EventDetails>) {
        this.setEventDetails({
            ...this.eventDetails,
            ...event
        })
    }

    updateTable(tableId: number, values: Partial<Table>) {
        this.setEventDetails({
            ...this.eventDetails,
            tables: this.eventDetails.tables.map( table => table.id === tableId
                ? { ...table, ...values }
                : table
            )
        })
    }

    useState() {
        return [ this.eventDetails, this.setEventDetails ] as const
    }

    getEventId() {
        return this.eventDetails.id as number
    }

    getRoomWidth() {
        return this.eventDetails.roomWidth;
    }

    getRoomLength() {
        return this.eventDetails.roomLength;
    }

    getDefaultTableObjectTemplateId() {
        return this.eventDetails.defaultTableObjectTemplateId;
    }

    getParties() {
        return this.eventDetails.parties;
    }

    getTags() {
        return this.eventDetails.tags;
    }

    getTables() {
        return this.eventDetails.tables;
    }

    getUnplacedTables(): Table[] {
        return this.eventDetails.tables.filter(table => !isPlacedTable(table))
    }

    getPlacedTables(): PlacedTable[] {
        return this.eventDetails.tables.filter(isPlacedTable)
    }

    getObjectTemplates() {
        return this.objectTemplates;
    }

    getScaledRoom() {
        const { roomWidth, roomLength } = this.eventDetails;
        if (!roomLength || !roomWidth) throw Error('Cannot get scaled room when roomLength or roomWidth are null')

        return {
            width: this.convertBaseToPixles(roomWidth),
            length: this.convertBaseToPixles(roomLength),
            fixtures: this.eventDetails.fixtures.map( fixture =>( {
                ...fixture,
                x: this.convertBaseToPixles(fixture.x),
                y: this.convertBaseToPixles(fixture.y)
            })),
            tables: this.getPlacedTables().map( table => ({
                ...table,
                x: this.convertBaseToPixles(table.x),
                y: this.convertBaseToPixles(table.y)
            }))
        }
    }

    getScaledObjectTemplate(objectTemplateId: number): ObjectTemplate | undefined {
        let template =  this.objectTemplates.find( template => template.id === objectTemplateId);
        if (!template) return template;
        return {
            ...template,
            width: this.convertBaseToPixles(template.width),
            length: this.convertBaseToPixles(template.length)
        }
    }

    getScaledDefaultTableObjectTemplate(): ObjectTemplate {
        const templateId = this.eventDetails.defaultTableObjectTemplateId;
        if (templateId === null) throw Error('Cannot place table when.defaultTableObjectTemplateId is null')
        const template = this.getScaledObjectTemplate(templateId);
        if (!template) throw Error('Missing template')
        return template;
    }

    async placeTable(tableId: number, x: number, y: number) {
        const template = this.getScaledDefaultTableObjectTemplate();

        const { color, shape, width, length } = template;

        this.updateEvent({
            ...this.eventDetails,
            tables: this.eventDetails.tables.map( table => (
                table.id === tableId
                    ? { ...table, color, shape, width, length, x, y }
                    : table
            )),
        })
    }
}

const EventEditorCtx = createContext<EventEditor | null>(null);

type EventEditorProviderProps = {
    eventId: number
    children: any
}

type EditorState = {
    view: 'assignments' | 'room',
    scale: number
}

export function EventEditorProvider({ eventId, children }: EventEditorProviderProps) {
    const objectTemplates = useResult(listEventObjectTemplates, eventId, { select: objectTemplateFields })

    const form = useFormForResult(getEventDetails, eventId, { select: eventDetailFields })

    const [ event, setEvent ] = form.useState();

    const { failure } = form.useSaveHandler(async (event) => {
        if (isLoading(event) || isAnyFailure(event)) return null
        return await updateEventDetails(eventId, event);
    })

    const isSaving = form.useAutosave(500)

    const [ editorState, setEditorState ] = useState<EditorState>({
        view: 'assignments',
        scale: 0,
    });

    if (isLoading(event) || isAnyFailure(event) || isLoading(objectTemplates) || isAnyFailure(objectTemplates)) return null

    return (
        <EventEditorCtx.Provider value={new EventEditor(objectTemplates, event, setEvent, editorState, setEditorState)} >
            {children}
        </EventEditorCtx.Provider>
    )
}

export function useEventEditor() {
    const value = useContext(EventEditorCtx);
    if (value === null) throw Error('Cannot use "useEventEditor" outside of an EventEditorProvider')
    return value;
}
