import { FixtureDisplay } from ".";
import { useEventEditor } from "../../../_shared/EventEditor";

export function FixtureBeingAdded() {
    const editor = useEventEditor();

    if (!editor.isAddingObject()) {
        return null;
    }

    const object = editor.getObjectBeingAdded();

    if (!editor.isFixture(object)) {
        return null;
    }

    return <FixtureDisplay fixture={{
        ...object,
        x: editor.convertBaseToPixles(object.x),
        y: editor.convertBaseToPixles(object.y),
        width: editor.convertBaseToPixles(object.width),
        length: editor.convertBaseToPixles(object.length)
    }} />
}