import type { Reflected } from "@triframe/ambassador";

type IUserWithOrganizationType = {
    id: number & {
        __serial__?: undefined | true;
    };
    organizationId: number;
    role: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordDigest: string;
    organization: {
        id: number & {
            __serial__?: undefined | true;
        };
        name: string;
    };
};

export const UserWithOrganizationType = {
    kind: "object" as const,
    __isReflected: true as const,
    properties: {
        id: {
            kind: "intersection" as const,
            __isReflected: true as const,
            alias: {
                typeName: "Serial" as const,
                typeArgs: [] as const
            } as const,
            types: [{
                    kind: "number" as const,
                    __isReflected: true as const
                }, {
                    kind: "object" as const,
                    __isReflected: true as const,
                    name: "1" as const,
                    properties: {
                        __serial__: {
                            kind: "union" as const,
                            __isReflected: true as const,
                            types: [{
                                    kind: "undefined" as const,
                                    __isReflected: true as const
                                }, {
                                    kind: "trueLiteral" as const,
                                    __isReflected: true as const
                                }] as const
                        } as const
                    } as const
                }] as const
        } as const,
        organizationId: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        role: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        firstName: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        lastName: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        email: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        passwordDigest: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        organization: {
            kind: "object" as const,
            __isReflected: true as const,
            name: "Organization" as const,
            properties: {
                id: {
                    kind: "intersection" as const,
                    __isReflected: true as const,
                    alias: {
                        typeName: "Serial" as const,
                        typeArgs: [] as const
                    } as const,
                    types: [{
                            kind: "number" as const,
                            __isReflected: true as const
                        }, {
                            kind: "object" as const,
                            __isReflected: true as const,
                            name: "1" as const,
                            properties: {
                                __serial__: {
                                    kind: "union" as const,
                                    __isReflected: true as const,
                                    types: [{
                                            kind: "undefined" as const,
                                            __isReflected: true as const
                                        }, {
                                            kind: "trueLiteral" as const,
                                            __isReflected: true as const
                                        }] as const
                                } as const
                            } as const
                        }] as const
                } as const,
                name: {
                    kind: "string" as const,
                    __isReflected: true as const
                } as const
            } as const
        } as const
    } as const
} as unknown as Reflected<IUserWithOrganizationType>;