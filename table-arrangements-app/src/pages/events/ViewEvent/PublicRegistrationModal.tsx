import { CopyIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Switch,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Tooltip,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEventEditor } from "../_shared";

export function PublicRegistrationModal({
  isOpen,
  onClose,
}: Pick<ModalProps, "isOpen" | "onClose">) {
  const editor = useEventEditor();

  const [ justCopied, setJustCopied ] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(editor.publicRegistrationUrl);
    setJustCopied(true);
    setTimeout(() => {
        setJustCopied(false)
    }, 1500)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={8}>
        <ModalHeader>{editor.getEventName()} Public Registration</ModalHeader>
        <ModalBody>
          <VStack spacing={8}>
            <FormControl display="flex" flexDirection="row" alignItems="center">
              <Switch
                id="isPublicRegistrationEnabled"
                isChecked={editor.isPublicRegistrationEnabled}
                onChange={() =>
                  editor.updateEvent({
                    isPublicRegistrationEnabled:
                      !editor.isPublicRegistrationEnabled,
                  })
                }
              />
                <FormLabel htmlFor="isPublicRegistrationEnabled" m={0} ml={2}>
                Public Registraion is{` `}
                {editor.isPublicRegistrationEnabled ? "Enabled" : "Disabled"}
              </FormLabel>
            </FormControl>
            <Tooltip isDisabled={editor.isPublicRegistrationEnabled} label="Public Registration is Disabled">
                <FormControl isDisabled={!editor.isPublicRegistrationEnabled}>
                <FormLabel>Public Registration Link</FormLabel>
                <InputGroup>
                    <Input isReadOnly value={`${editor.publicRegistrationUrl}`} />
                    <InputRightElement width='5.5rem'>
                        {editor.isPublicRegistrationEnabled &&
                            <Button
                                rightIcon={<CopyIcon />}
                                onClick={handleCopy}
                                size="sm"
                                colorScheme="blue"
                            >
                                {justCopied ? 'Copied' : 'Copy'}
                            </Button>}
                    </InputRightElement>
                </InputGroup>
                </FormControl>
            </Tooltip>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
