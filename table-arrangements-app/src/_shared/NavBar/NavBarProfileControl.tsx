import { isLoading, useResult } from "@triframe/utils-react";
import { getLoggedInUser, logout, UserWithOrganizationType } from "../../api";
import { from } from '@triframe/ambassador'
import { Avatar, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function NavBarProfileControl() {
    const user = useResult(getLoggedInUser, {
        select: from(UserWithOrganizationType)
            .firstName()
            .lastName()
    })

    const navigate = useNavigate();

    if (isLoading(user) || !user) return null;

    function handleLogout() {
        logout();
        navigate('/')
    }

    return (
        <Menu>
            <MenuButton>
                <Avatar
                    mr={2}
                    name={`${user.firstName} ${user.lastName}`}
                />
            </MenuButton>
            <MenuList>
                <MenuItem icon={<Icon as={BiLogOut} fontSize="1.75em" />} onClick={handleLogout}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}