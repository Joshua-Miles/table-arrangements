import { CloseIcon } from "@chakra-ui/icons";
import { Card, Flex, IconButton } from "@chakra-ui/react";
import { useEventEditor } from "../../EventEditor";
import { DefaultPanel } from "./DefaultPanel";
import { SelectedFixturePanel } from "./SelectedFixturePanel";
import { SelectedTablePanel } from "./SelectedTablePanel";


export function Sidebar() {
    const editor = useEventEditor();
    const selection = editor.getSelection();

    let contents = <DefaultPanel />;

    if (selection?.type === 'table') contents = <SelectedTablePanel table={editor.getTable(selection.tableId)} />

    if (selection?.type === 'fixture') contents = <SelectedFixturePanel fixture={editor.getFixture(selection.fixtureId)} />

    return (
        <Card w={300} height="100%" overflow="scroll">
            {selection &&
                <Flex>
                    <IconButton
                        aria-label="Back"
                        icon={<CloseIcon />}
                        variant="ghost"
                        size="lg"
                        onClick={() => editor.clearSelection()}
                    />
                </Flex>}
            {contents}
        </Card>
    )
}