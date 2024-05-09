import { Box, BoxProps, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useEventEditor } from "../EventEditor";
import { FixtureTemplate } from "../fields";

export type FixtureDisplayProps = BoxProps & {
    x?: number
    y?: number
    label?: string
    fixtureId?: number
    tableId?: number
    fixtureTemplateId: number
}

const shapePropCreators: Record<FixtureTemplate['shape'], (fixtureTemplate: FixtureTemplate) => BoxProps> = {
    rectangle: () => ({}),
    round: template => {
        const shortestSide = Math.min(template.width, template.length)
        return { borderRadius: shortestSide / 2 }
    }
}

export const FixtureDisplay = forwardRef(({ x, y, label, fixtureTemplateId, ...props }: FixtureDisplayProps, ref) => {
    const editor = useEventEditor()
    const template = editor.getScaledFixtureTemplate(fixtureTemplateId);

    const positionProps: BoxProps = !x || !y
        ? { position: 'relative' }
        : {
            position: 'absolute',
            left: x,
            top: y
        }

    const shapeProps = shapePropCreators[template.shape](template);

    return (
        <Box backgroundColor={template.color} w={template.length} h={template.width} {...shapeProps} {...positionProps} {...props} ref={ref}>
            <Text position="absolute" bottom={-6} w="100%" textAlign="center">{label}</Text>
        </Box>
    )
})
