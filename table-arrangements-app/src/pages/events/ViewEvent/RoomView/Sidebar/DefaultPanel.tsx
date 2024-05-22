import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, FlexProps, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack } from "@chakra-ui/react";
import { useEventEditor } from "../../EventEditor";
import { DraggableTableDisplay, TableDisplay } from "../TableDisplay";
import { BiSquare, BiCircle } from 'react-icons/bi'
import { FixtureDisplay } from "../FixtureDisplay";
import { Fixture, PlacedTable } from "../../fields";
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

    const unplacedTableResults = unplacedTables.filter( table => inferTableName(table, editor.getParties()).toLowerCase().includes(searchTerm.toLowerCase()))


    return (
        <VStack align="stretch" spacing={10}>
            <Box  p={2}>
                <Input placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <Flex justify="flex-end">
                    {!editor.isDisabled &&
                        <Menu placement="end">
                            <MenuButton
                                as={Button}
                                colorScheme="blue"
                                variant="ghost"
                                aria-label="Add Fixture"
                                leftIcon={<AddIcon /> }
                                size="xs"
                            >
                                Add Fixture
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem icon={<Icon as={BiSquare} />} onClick={() => editor.initiateAddingObject('rectangle')}>
                                        Rectangle
                                    </MenuItem>
                                    <MenuItem icon={<Icon as={BiCircle} />} onClick={() => editor.initiateAddingObject('round')}>
                                        Oval
                                    </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    }
                </Flex>
            </Box>
            <Box>
                {unplacedTableResults.length
                    ? <Text color="gray.500" fontSize="xs" ml={2}>Unplaced Tables</Text>
                    : null
                }
                <VStack spacing={10}>
                    {unplacedTableResults.map( table => (
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
                </VStack>
            </Box>
            <Box>
                {(fixtureResults.length || tableResults.length)
                    ? <Text color="gray.500" fontSize="xs" ml={2}>Fixtures & Tables</Text>
                    : null
                }
                <VStack align="stretch" spacing={0}>
                    {fixtureResults.map( fixture => (
                        <PanelButton onClick={() => editor.selectFixture(fixture)}>
                            <Text>{fixture.label || 'Unnamed'}</Text>
                            <FixtureDisplay inline fixture={scale(fixture, editor.scale)} />
                        </PanelButton>
                    ))}
                    {tableResults.map( table => (
                        <PanelButton onClick={() => editor.selectTable(table)}>
                            <Text>{inferTableName(table, editor.getParties())}</Text>
                            <TableDisplay inline table={scale(table, editor.scale)} />
                        </PanelButton>
                    ))}
                </VStack>
            </Box>
            {[fixtureResults.length, tableResults.length, unplacedTableResults.length ].every( count => count === 0)
                ?  <Center><Text>No objects match search "{searchTerm}"</Text></Center>
                : null
            }
        </VStack>
    )
}

function PanelButton(props: FlexProps) {
    const editor = useEventEditor();

    if (editor.isDisabled) {
        props = {
            ...props,
            onClick: undefined
        }
    }

    return <Flex
        justify="space-between"
        align="center"
        p={4}
        h={'100px'}
        cursor={editor.isDisabled ? undefined : "pointer"}
        _hover={editor.isDisabled ? undefined : { backgroundColor: 'gray.100'}}
        {...props}
    />
}

function scale<T extends (PlacedTable | Fixture)> (roomObject: T, maxScale: number = 1): T {
    const scale = Math.min(150 / roomObject.length, 50 / roomObject.width, maxScale)

    return {
        ...roomObject,
        x: roomObject.x * scale,
        y: roomObject.y * scale,
        length: roomObject.length * scale,
        width: roomObject.width * scale
    }
}
