import type { Reflected } from "@triframe/ambassador";

type ITableType = {
    id: number & {
        __serial__?: undefined | true;
    };
    eventId: number;
    label: string;
    orderby: number;
    capacity: number;
    fixtureId: null | number;
};

export const TableType = {
    kind: "object" as const,
    __isReflected: true as const,
    name: "Table" as const,
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
        orderby: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        capacity: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        fixtureId: {
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
} as unknown as Reflected<ITableType>;