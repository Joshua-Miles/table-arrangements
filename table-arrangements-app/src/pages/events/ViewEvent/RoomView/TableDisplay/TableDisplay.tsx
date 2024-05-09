import { Box, BoxProps, Text } from "@chakra-ui/react";
import Color from "color";
import { forwardRef } from "react";
import { useEventEditor } from "../../EventEditor";
import { ObjectTemplate, Table } from "../../fields";
import { inferTableName } from "../../inferTableLabel";

export type TableWithObjectTemplate = Table & {
    shape: 'round' | 'rectangle'
    color: string
    width: number
    length: number
}

export type TableDisplayProps = BoxProps & {
   table: TableWithObjectTemplate
}

const shapePropCreators: Record<ObjectTemplate['shape'], (table: TableWithObjectTemplate) => BoxProps> = {
    rectangle: () => ({}),
    round: template => {
        const shortestSide = Math.min(template.width, template.length)
        return { borderRadius: shortestSide / 2 }
    }
}

export const TableDisplay = forwardRef(({ table, ...boxProps }: TableDisplayProps, ref) => {
    const editor = useEventEditor();
    const { number, label, shape, color, x, y, length, width } = table;

    const positionProps: BoxProps = !x || !y
        ? { position: 'relative' }
        : {
            position: 'absolute',
            left: x,
            top: y
        }

    const shapeProps = shapePropCreators[shape](table);

    const numberColor = Color(color).isDark() ? '#ffffff' : '#000000'

    return (
        <Box backgroundColor={color} w={length} h={width} {...shapeProps} {...positionProps} {...boxProps} ref={ref}>
            <Text position="absolute" top="50%" transform="translateY(-50%)" color={numberColor} w="100%" textAlign="center">{number}</Text>
            <Text noOfLines={1} position="absolute"  top="100%" w="100%" textAlign="center">{inferTableName(table, editor.getParties())} Table</Text>
        </Box>
    )
})
