import { isLoading } from "@triframe/utils-react";
import { logout } from "../../api";
import { Avatar, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BiLogOut, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../useLoggedInUser";

export function NavBarProfileControl() {
    const user = useLoggedInUser();

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
                <MenuItem icon={<Icon as={BiUser} fontSize="1.75em" />} as={Link} to="/profile/edit">
                    Edit Account
                </MenuItem>
                <MenuItem icon={<Icon as={BiLogOut} fontSize="1.75em" />} onClick={handleLogout}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}