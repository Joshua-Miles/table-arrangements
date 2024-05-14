import { useEvent } from "@dnd-kit/utilities";
import { MouseEvent as ReactMouseEvent, useEffect, useRef } from "react"
import { useEventEditor } from "../EventEditor";
import { convert } from "../UnitOfMeasure";

type PanAnchor = {
    x: number | null,
    y: number | null
}

export function Gridlines() {
    const editor = useEventEditor();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const roomWidth = editor.getRoomWidth();

    const roomLength= editor.getRoomLength();

    const scaledRoom = editor.getScaledRoom()

    const unitOfMeasure = editor.defaultMeasurementSystem === 'imperial' ? 'feet' : 'meters';

    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas?.getContext('2d');

        if (!ctx || !roomWidth || !roomLength) return;

        ctx.clearRect(0, 0, scaledRoom.length, scaledRoom.width)

        if (!editor.shouldShowGridlines) return;

        const numberOfHorizonalLines = convert(roomWidth).to(unitOfMeasure);
        const numberOfVerticalLines = convert(roomLength).to(unitOfMeasure);

        for (let i = 0; i < numberOfHorizonalLines; i += 5) {
            const startOfRoom = 0;
            const endOfRoom = scaledRoom.length

            const x = editor.convertBaseToPixles(convert(i, 'feet').toBase());

            ctx.moveTo(startOfRoom, x);
            ctx.lineTo(endOfRoom, x);
            ctx.stroke();
        }

        for (let i = 0; i < numberOfVerticalLines; i += 5) {
            const startOfRoom = 0;
            const endOfRoom = scaledRoom.width

            const y = editor.convertBaseToPixles(convert(i, 'feet').toBase());

            ctx.moveTo(y, startOfRoom);
            ctx.lineTo(y, endOfRoom);
            ctx.stroke();
        }
    }, [ editor.scale, editor.shouldShowGridlines ])

    const { current: panAnchor } = useRef<PanAnchor>({
        x: null,
        y: null
    })

    function handleMouseDown(e: ReactMouseEvent) {
        if (editor.isAddingObject()) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const canvasRect = canvas.getBoundingClientRect();

            editor.updateObjectBeingAdded({
                x: editor.convertPixelsToBase(e.clientX - canvasRect.x),
                y: editor.convertPixelsToBase(e.clientY - canvasRect.y)
            })
        } else {
            const { x, y } = editor.getPanOffset();
            panAnchor.x = e.clientX - x;
            panAnchor.y = e.clientY - y;
        }
    }

    const handleMouseMove = useEvent((e: MouseEvent) => {
        if (editor.isAddingObject()) {
            const object = editor.getObjectBeingAdded();
            if (!editor.isFixture(object)) return;

            const canvas = canvasRef.current;
            if (!canvas) return;
            const canvasRect = canvas.getBoundingClientRect();

            editor.updateObjectBeingAdded({
                length: editor.convertPixelsToBase(e.clientX - canvasRect.x) - object.x,
                width: editor.convertPixelsToBase(e.clientY - canvasRect.y) - object.y
            })
        } else {
            const { x, y } = panAnchor;
            if (!x || !y) return;

            editor.pan(e.clientX - x, e.clientY - y);
        }
    })

    const handleMouseUp = useEvent((e: MouseEvent) => {
        if (editor.isAddingObject()) {
            editor.saveAddedObject();
        } else {
            e.preventDefault();
            panAnchor.x = null;
            panAnchor.y = null;
        }
    });

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            width={scaledRoom.length}
            height={scaledRoom.width}
            onClick={() => editor.clearSelection()}
            onMouseDown={handleMouseDown}
        />
    )
}