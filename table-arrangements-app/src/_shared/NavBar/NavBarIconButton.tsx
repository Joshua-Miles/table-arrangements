import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom'

type NavBarIconButtonProps = IconButtonProps & {
    to?: string
};

export function NavBarIconButton({ to, ...props }: NavBarIconButtonProps) {
    return (
        <IconButton
            as={to === undefined ? undefined : RouterLink}
            to={to}
            size="lg"
            height="100%"
            width="60px"
            fontSize="200%"
            colorScheme="blue"
            borderRadius={0}
            {...props}
        />
    )
}
