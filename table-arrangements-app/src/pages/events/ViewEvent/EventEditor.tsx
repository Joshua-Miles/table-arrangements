import { isAnyFailure } from "@triframe/ambassador";
import { createContext, useContext, useState } from "react";
import { createEventFixture } from "../../../api";
import { EventDetails, FixtureTemplate } from "./fields"
import { MeasurementSystem, UnitOfMeasure } from "./UnitOfMeasure";

class EventEditor {
    private eventDetails: EventDetails
    private setEventDetails: (eventDetails: EventDetails) => void

    private editorState: EditorState
    private setEditorState: (editorState: EditorState) => void

    constructor(
        eventDetails: EventDetails,
        setEventDetails: (eventDetails: EventDetails) => void,
        editorState: EditorState,
        setEditorState: (EditorState: EditorState) => void
    ) {
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
        const { roomWidth, roomLength, defaultTableFixtureTemplateId } = this.eventDetails;
        return (
            roomWidth !== null && roomLength !== null && defaultTableFixtureTemplateId !== null
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

    getDefaultTableFixtureTemplateId() {
        return this.eventDetails.defaultTableFixtureTemplateId;
    }

    getTags() {
        return this.eventDetails.tags;
    }

    getTables() {
        return this.eventDetails.tables;
    }

    getFixtureTemplates() {
        return this.eventDetails.fixtureTemplates;
    }

    getScaledRoom() {
        const { roomWidth, roomLength } = this.eventDetails;
        const { scale } = this.editorState;
        if (!roomLength || !roomWidth) throw Error('Cannot get scaled room when roomLength or roomWidth are null')
        return {
            width: roomWidth * scale,
            length: roomLength * scale
        }
    }

    getScaledFixturesWithLabels() {
        const tables = this.getTables();
        return this.eventDetails.fixtures.map ( fixture => ({
            ...fixture,
            label: tables.find( table => table.fixtureId === fixture.id)?.label,
            x: this.convertBaseToPixles(fixture.x),
            y: this.convertBaseToPixles(fixture.y),
        }))
    }

    getScaledFixtureTemplate(templateId: number) {
        const template = this.eventDetails.fixtureTemplates.find( template => template.id === templateId) as FixtureTemplate;
        return {
            ...template,
            length: this.convertBaseToPixles(template.length),
            width: this.convertBaseToPixles(template.width)
        }
    }

    async placeTable(tableId: number, x: number, y: number) {
        const templateId = this.eventDetails.defaultTableFixtureTemplateId;
        if (templateId === null) throw Error('Cannot place table when defaultTableFixtureTemplateId is null')
        const fixture = await createEventFixture(this.getEventId(), { templateId, x, y  });

        if (isAnyFailure(fixture)) throw Error('Failed to create fixture')

        this.updateEvent({
            ...this.eventDetails,
            tables: this.eventDetails.tables.map( table => (
                table.id === tableId
                    ? { ...table, fixtureId: fixture.id }
                    : table
            )),
            fixtures: [
                ...this.eventDetails.fixtures,
                fixture
            ]
        })
    }
}

const EventEditorCtx = createContext<EventEditor | null>(null);

type EventEditorProviderProps = {
    eventDetails: EventDetails
    setEventDetails: (eventDetails: EventDetails) => void
    children: any
}

type EditorState = {
    view: 'assignments' | 'room',
    scale: number
}

export function EventEditorProvider({ eventDetails, setEventDetails, children }: EventEditorProviderProps) {
    const [ editorState, setEditorState ] = useState<EditorState>({
        view: 'room',
        scale: 0,
    });

    return (
        <EventEditorCtx.Provider value={new EventEditor(eventDetails, setEventDetails, editorState, setEditorState)} >
            {children}
        </EventEditorCtx.Provider>
    )
}

export function useEventEditor() {
    const value = useContext(EventEditorCtx);
    if (value === null) throw Error('Cannot use "useEventEditor" outside of an EventEditorProvider')
    return value;
}
