import { Text, TextProps } from "@chakra-ui/react";

type NavBarTextProps = TextProps;

export function NavBarText(props: NavBarTextProps) {
    return <Text color="white" fontSize="lg" ml={2} {...props} />
}
