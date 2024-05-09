import type { Reflected } from "@triframe/ambassador";

type IFixtureType = {
    id: number & {
        __serial__?: undefined | true;
    };
    eventId: number;
    label: string;
    shape: "round" | "rectangle";
    color: string;
    length: number;
    width: number;
    x: number;
    y: number;
    zIndex: null | number;
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
        label: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        shape: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "stringLiteral" as const,
                    __isReflected: true as const,
                    value: "round" as const
                }, {
                    kind: "stringLiteral" as const,
                    __isReflected: true as const,
                    value: "rectangle" as const
                }] as const
        } as const,
        color: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        length: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        width: {
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
        } as const,
        zIndex: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "number" as const,
                    __isReflected: true as const
                }] as const
        } as const
    } as const
} as unknown as Reflected<IFixtureType>;