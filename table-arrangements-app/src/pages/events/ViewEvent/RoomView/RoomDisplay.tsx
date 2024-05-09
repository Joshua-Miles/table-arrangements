import { Box, Center } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { SyntheticEvent, useEffect, useRef } from "react";
import { useEventEditor } from "../EventEditor";

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
                (width) / (editor.getRoomLength() ?? 0),
                (height) / (editor.getRoomWidth() ?? 0)
            )
        )
    }

    return (
        <Center ref={container} width="100%" height="100%">
            <Box position="relative" width={room.length} height={room.width} border="1px solid gray" ref={setNodeRef}>
                {children}
            </Box>
        </Center>
    )
}