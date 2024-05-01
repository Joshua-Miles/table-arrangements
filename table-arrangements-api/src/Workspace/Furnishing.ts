import { persist, Serial } from "@triframe/scribe";

export type Furnishing = {
    id: Serial
    workspaceId: number
    label: string
    width: number
    height: number
}

export const Furnishings = persist<Furnishing>()
    .primaryKey('id')
    .indexBy('workspaceId');
