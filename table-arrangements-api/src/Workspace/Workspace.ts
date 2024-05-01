import { persist, Serial, AppendFields } from "@triframe/scribe";

export type Workspace = {
    id: Serial
    name: string | null;
    isPersonalWorkspace: boolean;
    creatorId: number
}

export const Workspaces = persist<Workspace>()
    .primaryKey('id')
    .defaults({ isPersonalWorkspace: false });

export const createWorkspace = (fields: AppendFields<typeof Workspaces>) => Workspaces.append(fields);
