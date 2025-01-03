import { from, isAnyFailure, isFailure, OptionalSerials, Unreflect } from '@triframe/ambassador'
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from "@dnd-kit/core";
import { isLoading, useFormForResult } from "@triframe/utils-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getEventDetails, updateEventDetails } from "../../../../api";
import { PartyCard } from "./PartyCard";
import { PartyList } from "./PartyList";
import { TableArea } from "./TableArea/TableArea";
import { eventDetailFields, Party } from '../../_shared/fields';
import { PartyModal } from './PartyModal';
import { EventEditorProvider, useEventEditor } from '../../_shared/EventEditor';


export function AssignmentView () {
    const editor = useEventEditor();

    const eventId = editor.getEventId();

    const [ event, setEvent ] = editor.useState();

    const [ draggedParty, setDraggedParty ] = useState<Party | null>(null);

    const [ selectedParty, setSelectedParty ] = useState<Party | null>(null)

    async function handleNewParty(newParty: Party) {
        if (isLoading(event)) return null;
        setEvent({
            ...event,
            parties: [
                ...event.parties,
                newParty
            ]
        })
    }

    function handleDragStart(e: DragStartEvent) {
       const party = e.active.data.current?.party as Party
       setDraggedParty(party);
    }

    async function handleDragEnd(e: DragEndEvent) {
        if (!e.over || !draggedParty || !draggedParty.id || isLoading(event)) return;
        const tableId = e.over.data.current?.tableId as number;
        let orderby = e.over.data.current?.orderby as number;
        if (tableId === draggedParty.tableId && draggedParty.orderby !== null && orderby === (draggedParty.orderby +1)) {
            return;
        }

        if (tableId === draggedParty.tableId && draggedParty.orderby !== null && draggedParty.orderby < orderby){
            orderby = orderby -1;
        }

        const updatedParty = {
            ...draggedParty,
            tableId:  tableId
        }

        // Get all of the other parties at the table
        const tableParties = event.parties.filter( party => party.tableId === tableId && party.id !== updatedParty.id);

        // Sort them
        tableParties.sort( (a,b) =>( a.orderby ?? 0) - (b.orderby ?? 0));

        // Add the updated party at it's new index
        tableParties.splice(orderby, 0, updatedParty);

        // Rewrite the indexes
        const updatedTableParties = index(tableParties.map( (party, index) => (
            party.orderby === index ? party : {
                ...party,
                orderby: index
            }
        )), 'id');

        setEvent({
            ...event,
            parties: event.parties.map( party => party.id !== undefined ? updatedTableParties[party.id] ?? party : party )
        })
    }

    function handlePartySaved(savedParty: Party) {
        if (isLoading(event)) return;
        setEvent({
            ...event,
            parties: event.parties.map( party => party.id === savedParty.id ? savedParty : party)
        })
        setSelectedParty(null)
    }

    function handlePartyDeleted(deletedParty: Party) {
        if (isLoading(event)) return;
        setEvent({
            ...event,
            parties: event.parties.filter( party => party.id !== deletedParty.id)
        })
        setSelectedParty(null)
    }

    if (isLoading(event) || isAnyFailure(event)) return null

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <Flex flex={1} height="100%">
                <PartyList
                    eventId={eventId}
                    parties={event.parties.filter(party => party.tableId === null)}
                    onPartyAdded={handleNewParty}
                    onPartySelected={setSelectedParty}
                    width={300}
                />
                <TableArea eventId={eventId} flex={1} event={event} onPartySelected={setSelectedParty} />
                <DragOverlay>
                    {draggedParty !== null &&
                        <PartyCard
                            party={draggedParty}
                            onPartySelected={setSelectedParty}
                        />
                    }
                </DragOverlay>
                <PartyModal
                    party={selectedParty}
                    onCancel={() => setSelectedParty(null)}
                    onSave={handlePartySaved}
                    onDelete={handlePartyDeleted}
                />
            </Flex>
        </DndContext>
    )
}

function index<T, K extends (keyof T)>(elements: T[], key: K): T[K] extends string | number ? Record<T[K], T> : never {
    const result = {} as T[K] extends string | number ? Record<T[K], T> : never;

    for (let element of elements) {
        (result as any)[element[key]] = element;
    }

    return result;
}

