import { Box, Center, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import { useEventEditor } from "../EventEditor";
import { format } from "../UnitOfMeasure";

type Props = {
    children: any
}

export function RoomDisplay({ children }: Props) {
    const editor = useEventEditor();
    const container = useRef<HTMLDivElement | null>(null);
    const room = editor.getScaledRoom();

    const { setNodeRef } = useDroppable({
        id: `drop-target-room-display`,
    });

    useEffect(() => {
       handleResize();
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize)
    }, [ container ])

    function handleResize() {
        if (!container.current) return;

        const { width, height } = container.current.getBoundingClientRect();

        editor.setScale(
            Math.min(
                (width) / ((editor.getRoomLength() ?? 0) + 20000),
                (height) / ((editor.getRoomWidth() ?? 0) + 20000)
            )
        )
    }

    const { x, y } = editor.getPanOffset();

    return (
        <Center ref={container} width="100%" height="100%" overflow="hidden">
            <Box
                ref={setNodeRef}
                position="relative"
                left={`${x}px`}
                top={`${y}px`}
                width={room.length}
                height={room.width}
                border="1px solid gray"
                cursor={editor.isAddingObject() ? 'crosshair' : 'pointer'}
            >
                {children}
                <Text position="absolute" left="0%" top="50%" transform="rotate(90deg) translate(-50%, 100%)">{format(editor.getRoomWidth() ?? 0, editor.defaultMeasurementSystem)}</Text>
                <Text position="absolute" left="50%" transform="translate(-50%)">{format(editor.getRoomLength() ?? 0, editor.defaultMeasurementSystem)}</Text>
            </Box>
        </Center>
    )
}