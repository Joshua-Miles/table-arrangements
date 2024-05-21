import { isLoading, useResult } from '@triframe/utils-react'
import { from } from '@triframe/ambassador'
import { getLoggedInUser, UserWithOrganizationType } from '../api'
import { Navigate } from 'react-router-dom'

export function Homepage() {
    const loggedInUser = useResult(getLoggedInUser, {
        select: from(UserWithOrganizationType)
            .email()
            .organization( organization => (
                organization
                    .id()
                    .name()
            ))
    })

    if (isLoading(loggedInUser)) return null;

    if (loggedInUser === null) return <Navigate to="/login" />

    return <Navigate to={`/organizations/${loggedInUser.organization.id}`} />
}
