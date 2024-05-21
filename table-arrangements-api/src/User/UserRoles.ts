
export const UserRoles = {
    admin: 100,
    collaborator: 10,
    user: 1
} as const

export type UserRole = (typeof UserRoles)[keyof (typeof UserRoles)]
