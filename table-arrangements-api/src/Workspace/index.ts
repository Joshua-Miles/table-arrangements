
export { Workspaces } from './Workspace'

export { createWorkspace } from './Workspace'

export { addUserToWorkspace } from './addUserToWorkspace'

export { WorkspaceUserRoles, WorkspaceUserRole } from './WorkspaceUser';

export { assertUserHasRoleOnWorkspace, } from './assertUserHasRoleOnWorkspace'

export { ObjectTemplates } from './ObjectTemplate';

import { getWorkspaceDetails, WorkspaceDetails } from './getWorkspaceDetails';

export const PublicWorkspaceInterface = {
    getWorkspaceDetails,

    WorkspaceDetailsType: WorkspaceDetails.type
}
