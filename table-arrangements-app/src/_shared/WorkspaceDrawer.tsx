import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

type WorkspaceDrawerProps = {
	isOpen: boolean
	onClose: () => void
}

export function WorkspaceDrawer({ isOpen, onClose }: WorkspaceDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
			onClose={onClose}
      placement="left"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Workspaces</DrawerHeader>
        <DrawerBody>

        </DrawerBody>

        <DrawerFooter>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
