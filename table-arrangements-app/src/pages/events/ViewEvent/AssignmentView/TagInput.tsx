import { EventTag } from "../fields";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tag,
  TagLeftIcon,
  Input,
  VStack,
  Flex,
  Text,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { KeyboardEvent, useRef, useState } from "react";
import { createEventTag } from '../../../../api'
import { isAnyFailure } from "@triframe/ambassador";

type TagInputProps = {
  eventId: number
  value: number | null;
  onChange: (value: number | null) => void;
  tags: EventTag[];
};

const colorSchemes = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]

let newTagColor = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]

export function TagInput({ eventId, tags, value, onChange }: TagInputProps) {

  const [ isSelectingTag, setIsSelectingTag ] = useState(false);

  const [ tagName, setTagName ] = useState('')

  const [ selectedIndex, setSelectedIndex ] = useState<number>(0);

  const selectedTag = tags.find( tag => tag.id === value);

  const searchInput = useRef<HTMLInputElement | null>(null);

  const displayedTags = tags.filter( tag => tag.label.includes(tagName))

  const exactMatch = displayedTags.find( tag => tag.label === tagName);

  if (!exactMatch && tagName.length > 0) displayedTags.push({ id: undefined, color: newTagColor, label: tagName })

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex >= displayedTags.length -1) return;
      return setSelectedIndex(selectedIndex + 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex === 0) return;
      return setSelectedIndex(selectedIndex - 1)
    }
    if (e.key === 'Enter') handleTagSelected(displayedTags[selectedIndex]);
    if (selectedIndex !== 0) setSelectedIndex(0)
  }

  async function handleTagSelected(tag: EventTag) {
    let tagId = tag.id;
    if (tagId === undefined) {
      const result = await createEventTag(eventId, tag)
      if (isAnyFailure(result)) throw new Error(`Failed to create tag`);
      tagId = result.id
    }
    onChange(tagId)
    setIsSelectingTag(false);
    newTagColor = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  }

  const selectedTagDisplay = selectedTag === undefined
    ? <Tag colorScheme="green" cursor="pointer" onClick={() => setIsSelectingTag(true)} variant="outline">
        <TagLeftIcon as={AddIcon} />
        <TagLabel>Tag</TagLabel>
      </Tag>
    : <Tag colorScheme={selectedTag.color} cursor="pointer" onClick={() => onChange(null)}>
        <TagLabel>{selectedTag.label}</TagLabel>
        <TagCloseButton />
      </Tag>

    return (
        <Popover isOpen={isSelectingTag} initialFocusRef={searchInput}>
          <PopoverTrigger>
            {selectedTagDisplay}
          </PopoverTrigger>
          <PopoverContent visibility={tagName.length > 0 ? 'visible' : 'hidden'} width={175}>
            <Input
              autoComplete="off"
              ref={searchInput}
              value={tagName}
              onChange={e => setTagName(e.target.value)}
              onKeyDown={handleKeydown}
              onBlur={() => setIsSelectingTag(false)}
            />
            <VStack>
              {displayedTags.map( (tag, index) => (
                <Flex role="button"
                  justify="center"
                  p={1}
                  w="100%"
                  backgroundColor={index === selectedIndex ? 'gray.100' : undefined}
                  onClick={() => handleTagSelected(tag)}
                  onMouseOver={() => setSelectedIndex(index)}
                >
                  {tag.id === undefined ? <Text mr={2}>Create</Text> : null}
                  <Tag colorScheme={tag.color} cursor="pointer">
                    <TagLabel>{tag.label}</TagLabel>
                  </Tag>
                </Flex>
              ))}
            </VStack>
          </PopoverContent>
        </Popover>
    )
}
