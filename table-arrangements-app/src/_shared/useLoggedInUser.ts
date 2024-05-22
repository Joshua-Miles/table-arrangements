import { useResult } from "@triframe/utils-react";
import { from } from "@triframe/ambassador";
import { getLoggedInUser, UserWithOrganizationType } from "../api";

export function useLoggedInUser() {
    return useResult(getLoggedInUser, {
        select: from(UserWithOrganizationType)
            .firstName()
            .lastName()
            .email()
            .organizationId()
            .role()
            .id()
    })
}