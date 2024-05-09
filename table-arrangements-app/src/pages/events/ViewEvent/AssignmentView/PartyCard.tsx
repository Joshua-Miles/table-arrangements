import { EditIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Card, CardBody, Flex, IconButton, Tag, TagLabel, Text, VStack } from "@chakra-ui/react";
import Color from "color";
import { forwardRef } from "react";
import { useEventEditor } from "../EventEditor";
import { Party } from "../fields";
import { inferPartyName } from "../inferPartyName";

export type PartyCardProps = BoxProps & {
  party: Party;
  showIndex?: boolean
  indexOffset?: number
  onPartySelected: (party: Party) => void
};

export const PartyCard = forwardRef(({ party, showIndex, onPartySelected, indexOffset = 0, ...props}: PartyCardProps, ref) => {
  let partyStyles = party.attendees.length > 1 ? {
      borderLeftColor: party.color,
      borderRadius: "0.375rem",
      borderLeftStyle: "solid",
      borderLeftWidth: 3
  } as const : {}

  const editor = useEventEditor();

  const tags = editor.getTags();

  return (
    <Box width="100%" {...partyStyles} {...props} ref={ref}>
      <Flex justifyContent={party.attendees.length > 1 ? "space-between" : 'flex-end'}>
        {party.attendees.length > 1 &&
          <Text color={Color(party.color).darken(.5).hex()} fontSize="xs" p={1}>{inferPartyName(party)}</Text>
        }
        <Button variant="ghost" leftIcon={<EditIcon />} onMouseDown={() => onPartySelected(party)} size="xs" colorScheme="blue">
          Edit
        </Button>

      </Flex>
      <VStack spacing={1} align="stretch">
        {party.attendees.map( (attendee, index) => {
          const tag = tags.find(tag => attendee.tagId === tag.id)
          return (
            <Card borderLeftRadius={party.attendees.length > 1 ? 0 : undefined }>
              <CardBody p={2} display="flex" justifyContent="space-between">
                {showIndex ? `${index + 1 + indexOffset}.` : null} {attendee.name}
                {tag && <Tag colorScheme={tag.color}><TagLabel>{tag.label}</TagLabel></Tag>}
              </CardBody>
            </Card>
          )
        })}
      </VStack>
    </Box>
  );
})
