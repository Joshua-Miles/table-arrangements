import { AppendFields } from "@triframe/scribe";
import { createDefaultObjectTemplates } from "./ObjectTemplates";
import { Organizations } from "./Organizations";

export const createOrganization = async (fields: AppendFields<typeof Organizations>) => {
    const organization = await Organizations.append(fields)
    await createDefaultObjectTemplates(organization.id);
    return organization;
};
