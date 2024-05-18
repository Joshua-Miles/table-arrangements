import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useFormForResult, useResult } from "@triframe/utils-react";
import { createContext, useContext, useState } from "react";
import { getEventDetails, listEventObjectTemplates, updateEventDetails } from "../../../api";
import { eventDetailFields, EventDetails, Fixture, isPlacedTable, ObjectTemplate, objectTemplateFields, PlacedTable, Table } from "./fields"
import { MeasurementSystem } from "./UnitOfMeasure";

type EditorState = {
    view: 'assignments' | 'room',
    scale: number,
    selection: null | TableSelection | FixtureSelection,
    panOffset: {
        x: number
        y: number
    }
    addingObject: null | { shape: Fixture['shape'] } | Fixture
    shouldShowGridlines: boolean
}

type TableSelection = {
    type: 'table',
    tableId: number
}

type FixtureSelection = {
    type: 'fixture',
    fixtureId: number
}

const defaultEditorState: EditorState = {
    view: 'assignments',
    scale: 0,
    selection: null,
    panOffset: {
        x: 1,
        y: 1
    },
    addingObject: null,
    shouldShowGridlines: false
}


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

    get scale() {
        return this.editorState.scale;
    }

    get shouldShowGridlines() {
        return this.editorState.shouldShowGridlines;
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

    zoomIn() {
        this.setEditorState({
            ...this.editorState,
            scale: this.editorState.scale + (this.editorState.scale * .1)
        })
    }

    zoomOut() {
        this.setEditorState({
            ...this.editorState,
            scale: this.editorState.scale - (this.editorState.scale * .1)
        })
    }

    clearSelection() {
        this.setEditorState({
            ...this.editorState,
            selection: null
        })
    }

    selectTable(table: Table) {
        if (!table.id) return;
        this.setEditorState({
            ...this.editorState,
            selection: {
                type: 'table',
                tableId: table.id
            }
        })
    }

    selectFixture(fixture: Fixture) {
        if (!fixture.id) return;
        this.setEditorState({
            ...this.editorState,
            selection: {
                type: 'fixture',
                fixtureId: fixture.id
            }
        })
    }

    getSelection() {
        return this.editorState.selection;
    }

    isTableSelected(table: Table) {
        return (
            this.editorState.selection?.type === 'table'
                &&
            this.editorState.selection.tableId === table.id
        )
    }

    isFixtureSelected(fixture: Fixture) {
        return (
            this.editorState.selection?.type === 'fixture'
                &&
            this.editorState.selection.fixtureId === fixture.id
        )
    }

    pan(x: number, y: number) {
        const currentPan = this.getPanOffset();
        if (x === currentPan.x && y === currentPan.y) return;
        this.setEditorState({
            ...this.editorState,
            panOffset: { x, y }
        })
    }

    getPanOffset() {
        return this.editorState.panOffset
    }

    toggleGridlines() {
        this.setEditorState({
            ...this.editorState,
            shouldShowGridlines: !this.editorState.shouldShowGridlines
        })
    }


    initiateAddingObject(shape: Fixture['shape']) {
        this.setEditorState({
            ...this.editorState,
            addingObject: { shape }
        })
    }

    isAddingObject() {
        return this.editorState.addingObject !== null;
    }

    getObjectBeingAdded() {
        const object = this.editorState.addingObject;
        if (object === null) throw Error('Not currently adding object')
        return object;
    }

    getFixtureBeingAdded() {
        const object = this.editorState.addingObject;
        if (!this.isFixture(object)) throw Error('Not currently adding fixture')
        return object;
    }

    updateObjectBeingAdded(values: Partial<Fixture>) {
        const object = this.getObjectBeingAdded();
        this.setEditorState({
            ...this.editorState,
            addingObject: {
                id: undefined,
                color: '#000000',
                label: '',
                x: 0,
                y: 0,
                width: 0,
                length: 0,
                ...object,
                ...values
            }
        })
    }

    saveAddedObject() {
        const object = this.getObjectBeingAdded();
        if (!this.isFixture(object)) throw Error('Failed to save object')
        this.setEditorState({
            ...this.editorState,
            addingObject: null
        })
        this.setEventDetails({
            ...this.eventDetails,
            fixtures: [
                ...this.eventDetails.fixtures,
                object
            ]
        })
    }

    convertPixelsToBase(pixels: number) {
        return pixels / this.editorState.scale;
    }

    convertBaseToPixles(measurement: number) {
        return measurement * this.editorState.scale;
    }

    isFixture(x: any): x is Fixture {
        const isDefined = (x: any) =>  ![undefined, null].includes(x)
        return x && isDefined(x.x) && isDefined(x.y) && isDefined(x.width) && isDefined(x.length)
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

    updateFixture(fixtureId: number, values: Partial<Fixture>) {
        this.setEventDetails({
            ...this.eventDetails,
            fixtures: this.eventDetails.fixtures.map( fixture => fixture.id === fixtureId
                ? { ...fixture, ...values }
                : fixture
            )
        })
    }

    deleteFixture(fixtureToDelete: Fixture) {
        if (this.isFixtureSelected(fixtureToDelete)) {
            this.clearSelection();
        }
        this.setEventDetails({
            ...this.eventDetails,
            fixtures: this.eventDetails.fixtures.filter( fixture => fixture.id !== fixtureToDelete.id)
        })
    }

    useState() {
        return [ this.eventDetails, this.setEventDetails ] as const
    }

    getEventId() {
        return this.eventDetails.id as number
    }

    getEventName() {
        return this.eventDetails.name;
    }

    getWorkspaceId() {
        return this.eventDetails.workspaceId;
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

    getUnplacedParties() {
        return this.eventDetails.parties.filter( party => party.tableId === null);
    }

    getParties() {
        return this.eventDetails.parties;
    }

    getPartiesForTable(tableId: Table['id']) {
        let parties = this.eventDetails.parties.filter (party => party.tableId === tableId)
        parties.sort((a,b) => (a.orderby ?? 0) - (b.orderby ?? 0))
        return parties
    }

    getTags() {
        return this.eventDetails.tags;
    }

    getTag(tagId?: number) {
        return this.eventDetails.tags.find( tag => tag.id === tagId)
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

    getFixtures(): Fixture[] {
        return this.eventDetails.fixtures;
    }

    getTable(tableId: number): Table {
        return this.eventDetails.tables.find(table => table.id === tableId) as Table;
    }

    getFixture(fixtureId: number): Fixture {
        return this.eventDetails.fixtures.find(fixture => fixture.id === fixtureId) as Fixture;
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
                y: this.convertBaseToPixles(fixture.y),
                width: this.convertBaseToPixles(fixture.width),
                length: this.convertBaseToPixles(fixture.length)
            })),
            tables: this.getPlacedTables().map( table => ({
                ...table,
                x: this.convertBaseToPixles(table.x),
                y: this.convertBaseToPixles(table.y),
                width: this.convertBaseToPixles(table.width),
                length: this.convertBaseToPixles(table.length)
            }))
        }
    }

    getObjectTemplate(objectTemplateId: number) {
        const template =  this.objectTemplates.find( template => template.id === objectTemplateId);
        if (!template) throw Error('Missing template')
        return template;
    }

    getScaledObjectTemplate(objectTemplateId: number): ObjectTemplate  {
        let template =  this.getObjectTemplate(objectTemplateId);
        return {
            ...template,
            width: this.convertBaseToPixles(template.width),
            length: this.convertBaseToPixles(template.length)
        }
    }

    getScaledDefaultTableObjectTemplate(): ObjectTemplate {
        const templateId = this.eventDetails.defaultTableObjectTemplateId;
        if (templateId === null) throw Error('Cannot place table when.defaultTableObjectTemplateId is null')
        return this.getScaledObjectTemplate(templateId);
    }

    getDefaultTableObjectTemplate(): ObjectTemplate {
        const templateId = this.eventDetails.defaultTableObjectTemplateId;
        if (templateId === null) throw Error('Cannot place table when.defaultTableObjectTemplateId is null')
        return this.getObjectTemplate(templateId)
    }

    placeTable(tableId: number, x: number, y: number) {
        const template = this.getDefaultTableObjectTemplate();

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

    placeFixture(fixtureId: number, x: number, y: number) {
        this.updateEvent({
            ...this.eventDetails,
            fixtures: this.eventDetails.fixtures.map( fixture => (
                fixture.id === fixtureId
                    ? { ...fixture, x, y }
                    : fixture
            )),
        })
    }
}

const EventEditorCtx = createContext<EventEditor | null>(null);

type EventEditorProviderProps = {
    eventId: number
    children: any
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

    const [ editorState, setEditorState ] = useState<EditorState>(defaultEditorState);

    if (isLoading(event) || isAnyFailure(event) || isLoading(objectTemplates) || isAnyFailure(objectTemplates)) return null

    return (
        <EventEditorCtx.Provider value={new EventEditor(objectTemplates, event, setEvent, editorState, setEditorState)} >
            {children}
        </EventEditorCtx.Provider>
    )
}

export function useEventEditor() {
    const value = useContext(EventEditorCtx);
    // @ts-ignore
    window.editor = value
    if (value === null) throw Error('Cannot use "useEventEditor" outside of an EventEditorProvider')
    return value;
}
