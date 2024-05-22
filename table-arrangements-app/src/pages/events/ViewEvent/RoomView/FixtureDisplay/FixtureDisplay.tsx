import { Box, BoxProps, Tooltip } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useEventEditor } from "../../EventEditor";
import { Fixture, ObjectTemplate } from "../../fields";


export type FixtureDisplayProps = BoxProps & {
    inOverlay?: boolean
    fixture: Fixture
    inline?: boolean
}

const shapePropCreators: Record<ObjectTemplate['shape'], (table: Fixture) => BoxProps> = {
    rectangle: () => ({}),
    round: template => {
        const shortestSide = Math.min(template.width, template.length)
        return { borderRadius: shortestSide / 2 }
    }
}

export const FixtureDisplay = forwardRef(({ fixture, inOverlay, inline, ...boxProps }: FixtureDisplayProps, ref) => {
    const editor = useEventEditor();
    const { shape, color, x, y, length, width } = fixture;

    const positionProps: BoxProps = inline
        ? { position: 'relative' }
        : {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`
        }

    const shapeProps = shapePropCreators[shape](fixture);

    function handleClick() {
        if (editor.isDisabled) return;
        editor.selectFixture(fixture)
    }

    return (
        <Tooltip placement="right" isDisabled={boxProps.visibility === 'hidden' || inOverlay} label={fixture.label}>
            <Box
                ref={ref}
                backgroundColor={color}
                w={`${length}px`}
                h={`${width}px`}
                {...shapeProps}
                {...positionProps}
                {...boxProps}
                onClick={handleClick}
            >
                <Box display={editor.isFixtureSelected(fixture) ? 'block' : 'none'} position="absolute" left="-5px" top="-5px" w={`${length + 10}px`} h={`${width + 10}px`}  border='1px solid' borderColor= 'blue.500' />
            </Box>
        </Tooltip>
    )
})
