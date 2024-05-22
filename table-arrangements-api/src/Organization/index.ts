
import { Organizations } from './Organizations'

import { ObjectTemplates } from './ObjectTemplates';

import { createOrganization } from './createOrganization'

import { getOrganization } from './getOrganization';
import { updateOrganization } from './updateOrganization';


export { Organizations, ObjectTemplates, createOrganization, getOrganization }

export const PublicOrganizationInterface = {
    getOrganization,
    updateOrganization,
    OrganizationType: Organizations.type
}
