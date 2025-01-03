import { Box, BoxProps, List, ListItem, OrderedList, Text, Tooltip, UnorderedList } from "@chakra-ui/react";
import Color from "color";
import { forwardRef, useState } from "react";
import { useEventEditor } from "../../../_shared/EventEditor";
import { Attendee, ObjectTemplate, Table } from "../../../_shared/fields";
import { inferTableName } from "../../inferTableLabel";


export type TableWithObjectTemplate = Table & {
    shape: 'round' | 'rectangle'
    color: string
    width: number
    length: number
}

export type TableDisplayProps = BoxProps & {
    inOverlay?: boolean
    table: TableWithObjectTemplate
    inline?: boolean
}

const shapePropCreators: Record<ObjectTemplate['shape'], (table: TableWithObjectTemplate) => BoxProps> = {
    rectangle: () => ({}),
    round: template => {
        const shortestSide = Math.min(template.width, template.length)
        return { borderRadius: shortestSide / 2 }
    }
}

export const TableDisplay = forwardRef(({ table, inOverlay, inline, ...boxProps }: TableDisplayProps, ref) => {
    const editor = useEventEditor();
    const { number, shape, color, x, y, length, width } = table;

    const positionProps: BoxProps = !x || !y || inline
        ? { position: 'relative' }
        : {
            position: 'absolute',
            left: x,
            top: y
        }

    const shapeProps = shapePropCreators[shape](table);

    const numberColor = Color(color).darken(0.05).isDark() ? '#ffffff' : '#000000'

    const attendees = editor.getPartiesForTable(table.id)
        .reduce( (allAttendees, party) => [ ...allAttendees, ...party.attendees ], [] as Attendee[])
        .map( attendee =>
            attendee.tagId
                ? `${attendee.name} - ${editor.getTag(attendee.tagId)?.label}`
                : attendee.name
        )

    function handleClick() {
        if (editor.isDisabled) return;
        editor.selectTable(table)
    }

    return (
        <Tooltip placement="right" isDisabled={attendees.length === 0 || boxProps.visibility === 'hidden' || inOverlay} label={
            <OrderedList>
                {attendees.map( attendee =>
                    <ListItem key={attendee}>{attendee}</ListItem>
                )}
            </OrderedList>
        }>
            <Box
                ref={ref}
                backgroundColor={color}
                w={length}
                h={width}
                {...shapeProps}
                {...positionProps}
                {...boxProps}
                onClick={handleClick}
            >
                <Box display={editor.isTableSelected(table) ? 'block' : 'none'} position="absolute" left="-5px" top="-5px" w={`${length + 10}px`} h={`${width + 10}px`}  border='1px solid' borderColor= 'blue.500' />
                <Text position="absolute" top="50%" transform="translateY(-50%)" color={numberColor} w="100%" textAlign="center">{number}</Text>
                {!inline && <Text backgroundColor="whiteAlpha.700" noOfLines={1} position="absolute"  top="100%" w="100%" textAlign="center">{inferTableName(table, editor.getParties())}</Text>}
            </Box>
        </Tooltip>
    )
})
