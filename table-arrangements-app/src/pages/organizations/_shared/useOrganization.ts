import { useResult } from "@triframe/utils-react";
import { from } from '@triframe/ambassador'
import { getOrganization, OrganizationType } from "../../../api";

export function useOrganization(organizationId: number) {
    return useResult(getOrganization, organizationId, {
        select: from(OrganizationType)
            .name()
    })
}