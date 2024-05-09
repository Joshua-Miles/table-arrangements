import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

export type DropTargetProps = {
    tableId: number
    orderby: number
}

export function DropTarget({ tableId, orderby }: DropTargetProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: `drop-target-${tableId}-${orderby}`,
        data: {
            tableId,
            orderby
        },
    });

    let borderProps  = isOver
        ? { borderWidth: 2, borderStyle: 'dashed', borderColor: 'blue.200' }
        : {}

    return (
        <Box ref={setNodeRef} width="100%" height={isOver ? 25 : 1} {...borderProps}>

        </Box>
    )
}