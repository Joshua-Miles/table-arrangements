import type { Reflected } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

type IObjectTemplateType = {
    id: number & {
        __serial__?: undefined | true;
    };
    workspaceId: number;
    label: string;
    shape: "round" | "rectangle";
    color: string;
    width: number;
    length: number;
};

export const ObjectTemplateType = {
    kind: "object" as const,
    __isReflected: true as const,
    name: "ObjectTemplate" as const,
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
        workspaceId: {
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
        width: {
            kind: "number" as const,
            __isReflected: true as const
        } as const,
        length: {
            kind: "number" as const,
            __isReflected: true as const
        } as const
    } as const
} as unknown as Reflected<IObjectTemplateType>;