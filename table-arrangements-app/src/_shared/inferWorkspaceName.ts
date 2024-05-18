
type Options = {
    name?: string | null
    creator?: null | {
        firstName?: string
    }
}

export function inferWorkspaceName(workspace: Options) {
    return workspace.name ?? `${workspace.creator?.firstName}'s Events`
}
