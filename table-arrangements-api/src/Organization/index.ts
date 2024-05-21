
import { Organizations } from './Organizations'

import { ObjectTemplates } from './ObjectTemplates';

import { createOrganization } from './createOrganization'

import { getOrganization } from './getOrganization';

export { Organizations, ObjectTemplates, createOrganization, getOrganization }

export const PublicOrganizationInterface = {
    getOrganization,
    OrganizationType: Organizations.type
}
