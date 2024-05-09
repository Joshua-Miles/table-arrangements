import { persist, Serial, AppendFields } from "@triframe/scribe";
import { createDefaultObjectTemplates } from "./ObjectTemplate";

export type Workspace = {
    id: Serial
    name: string | null;
    isPersonalWorkspace: boolean;
    creatorId: number
}

export const Workspaces = persist<Workspace>()
    .primaryKey('id')
    .defaults({ isPersonalWorkspace: false });

export const createWorkspace = async (fields: AppendFields<typeof Workspaces>) => {
    const workspace = await Workspaces.append(fields)
    await createDefaultObjectTemplates(workspace.id);
    return workspace;
};
