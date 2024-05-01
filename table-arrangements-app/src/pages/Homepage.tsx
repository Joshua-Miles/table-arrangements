import { isLoading, useResult } from '@triframe/utils-react'
import { from } from '@triframe/ambassador'
import { getLoggedInUser, UserWithWorspacesType } from '../api'
import { Navigate } from 'react-router-dom'

export function Homepage() {
    const loggedInUser = useResult(getLoggedInUser, {
        select: from(UserWithWorspacesType)
            .email()
            .personalWorkspace( w => (
                w.id()
            ))
    })

    if (isLoading(loggedInUser)) return null;

    if (loggedInUser === null) return <Navigate to="/login" />

    return <Navigate to={`/workspaces/${loggedInUser.personalWorkspace.id}`} />
}
