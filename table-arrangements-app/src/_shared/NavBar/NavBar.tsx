import { Flex, FlexProps } from "@chakra-ui/react";

export type NavBarProps = FlexProps;

export function NavBar({ children, ...props }: NavBarProps) {
  return (
    <Flex align="center" height="60px" backgroundColor="blue.500" {...props}>
      {children}
    </Flex>
  );
}
