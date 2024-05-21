import { persist, Serial } from "@triframe/scribe"

export type ObjectTemplate = {
    id: Serial
    organizationId: number
    label: string
    shape: 'round' | 'rectangle'
    color: string
    width: number
    length: number
}

export const ObjectTemplates = persist<ObjectTemplate>()
    .primaryKey('id')
    .indexBy('organizationId');
