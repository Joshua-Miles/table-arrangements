import { HStack, StackProps } from "@chakra-ui/react";

export function NavBarEnd(props: StackProps) {
    return <HStack height="100%" flex={1} justify="end" spacing={2} {...props} />
}