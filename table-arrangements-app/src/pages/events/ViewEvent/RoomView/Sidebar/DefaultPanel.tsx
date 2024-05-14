import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, FlexProps, HStack, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { useEventEditor } from "../../EventEditor";
import { DraggableTableDisplay, TableDisplay, TableWithObjectTemplate } from "../TableDisplay";
import { BiSquare, BiCircle } from 'react-icons/bi'
import { FixtureDisplay } from "../FixtureDisplay";
import { Fixture, PlacedTable, Table } from "../../fields";
import { inferTableName } from "../../inferTableLabel";
import { useState } from "react";

export function DefaultPanel() {
    const editor = useEventEditor();

    const [ searchTerm, setSearchTerm ] = useState('');

    const { shape, color, width, length } = editor.getScaledDefaultTableObjectTemplate();

    const unplacedTables = editor.getUnplacedTables();

    const fixtures = editor.getFixtures();

    const placedTables = editor.getPlacedTables();

    const fixtureResults = fixtures.filter( fixture => fixture.label.toLowerCase().includes(searchTerm.toLowerCase()))

    const tableResults = placedTables.filter( table => inferTableName(table, editor.getParties()).toLowerCase().includes(searchTerm.toLowerCase()))


    return (
        <VStack align="stretch" spacing={10}>
            <Box  p={2}>
                <Input placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <Flex justify="flex-end">
                    <Menu>
                        <MenuButton
                            as={Button}
                            colorScheme="blue"
                            variant="ghost"
                            aria-label="Add Fixture"
                            leftIcon={<AddIcon /> }
                            rightIcon={<ChevronDownIcon />}
                            size="xs"
                        >
                            Fixture
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<Icon as={BiSquare} />} onClick={() => editor.initiateAddingObject('rectangle')}>
                                Rectangle
                            </MenuItem>
                            <MenuItem icon={<Icon as={BiCircle} />} onClick={() => editor.initiateAddingObject('round')}>
                                Oval
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Box>
            {unplacedTables.map( table => (
                <Center>
                    <DraggableTableDisplay
                        table={{
                            ...table,
                            shape,
                            color,
                            width,
                            length
                        }}
                    />
                </Center>
            ))}
             <VStack align="stretch" spacing={0}>
                {fixtureResults.map( fixture => (
                    <PanelButton onClick={() => editor.selectFixture(fixture)}>
                        <Text>{fixture.label || 'Unnamed'}</Text>
                        <FixtureDisplay inline fixture={scale(fixture)} />
                    </PanelButton>
                ))}
                {tableResults.map( table => (
                    <PanelButton onClick={() => editor.selectTable(table)}>
                        <Text>{inferTableName(table, editor.getParties())}</Text>
                        <TableDisplay inline table={scale(table)} />
                    </PanelButton>
                ))}
            </VStack>
        </VStack>
    )
}

function PanelButton(props: FlexProps) {
    return <Flex
        justify="space-between"
        align="center"
        p={4}
        h={'100px'}
        cursor="pointer"
        _hover={{ backgroundColor: 'gray.100'}}
        {...props}
    />
}

function scale<T extends (PlacedTable | Fixture)> (roomObject: T): T {
    const scale = Math.min(150 / roomObject.length, 50 / roomObject.width, 1)

    return {
        ...roomObject,
        x: roomObject.x * scale,
        y: roomObject.y * scale,
        length: roomObject.length * scale,
        width: roomObject.width * scale
    }
}