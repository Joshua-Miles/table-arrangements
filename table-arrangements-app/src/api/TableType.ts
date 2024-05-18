import type { Reflected } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

type ITableType = {
    id: number & {
        __serial__?: undefined | true;
    };
    eventId: number;
    number: number;
    label: null | string;
    orderby: number;
    capacity: number;
    shape: null | "round" | "rectangle";
    color: null | string;
    length: null | number;
    width: null | number;
    x: null | number;
    y: null | number;
    zIndex: null | number;
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
        number: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        label: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "string" as const,
                    __isReflected: true as const
                }] as const
        } as const,
        orderby: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        capacity: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        shape: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
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
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "string" as const,
                    __isReflected: true as const
                }] as const
        } as const,
        length: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "number" as const,
                    __isReflected: true as const
                }] as const
        } as const,
        width: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "number" as const,
                    __isReflected: true as const
                }] as const
        } as const,
        x: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "number" as const,
                    __isReflected: true as const
                }] as const
        } as const,
        y: {
            kind: "union" as const,
            __isReflected: true as const,
            types: [{
                    kind: "null" as const,
                    __isReflected: true as const
                }, {
                    kind: "number" as const,
                    __isReflected: true as const
                }] as const
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
} as unknown as Reflected<ITableType>;