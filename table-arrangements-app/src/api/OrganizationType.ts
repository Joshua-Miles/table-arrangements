import type { Reflected } from "@triframe/ambassador";

type IOrganizationType = {
    id: number & {
        __serial__?: undefined | true;
    };
    name: string;
};

export const OrganizationType = {
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
} as unknown as Reflected<IOrganizationType>;