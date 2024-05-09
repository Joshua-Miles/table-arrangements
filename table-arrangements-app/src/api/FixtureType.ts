import type { Reflected } from "@triframe/ambassador";

type IFixtureType = {
    id: number & {
        __serial__?: undefined | true;
    };
    eventId: number;
    templateId: number;
    x: number;
    y: number;
};

export const FixtureType = {
    kind: "object" as const,
    __isReflected: true as const,
    name: "Fixture" as const,
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
        eventId: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        templateId: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        x: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        y: {
            kind: "number" as const,
            __isReflected: true as const
        } as const
    } as const
} as unknown as Reflected<IFixtureType>;