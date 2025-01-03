import type { Reflected } from "@triframe/ambassador";

type IEventRegistrationInfoType = {
    id: number & {
        __serial__?: undefined | true;
    };
    organizationId: number;
    name: string;
    roomWidth: null | number;
    roomLength: null | number;
    defaultTableObjectTemplateId: null | number;
    isPublicRegistrationEnabled: boolean;
    publicRegistrationKey: string;
    customFields: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        orderby: number;
        scope: "party" | "attendee";
        name: string;
        type: "text" | "email" | "phone";
        prompt: string;
        placeholder: string;
        isRequired: boolean;
    }[];
};

export const EventRegistrationInfoType = {
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
        name: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        roomWidth: {
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
        roomLength: {
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
        defaultTableObjectTemplateId: {
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
        isPublicRegistrationEnabled: {
            kind: "boolean" as const,
            __isReflected: true as const
        } as const,
        publicRegistrationKey: {
            kind: "string" as const,
            __isReflected: true as const
        } as const,
        customFields: {
            kind: "array" as const,
            of: {
                kind: "object" as const,
                __isReflected: true as const,
                name: "CustomField" as const,
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
                    orderby: {
                        kind: "number" as const,
                        __isReflected: true as const
                    } as const,
                    scope: {
                        kind: "union" as const,
                        __isReflected: true as const,
                        types: [{
                                kind: "stringLiteral" as const,
                                __isReflected: true as const,
                                value: "party" as const
                            }, {
                                kind: "stringLiteral" as const,
                                __isReflected: true as const,
                                value: "attendee" as const
                            }] as const
                    } as const,
                    name: {
                        kind: "string" as const,
                        __isReflected: true as const
                    } as const,
                    type: {
                        kind: "union" as const,
                        __isReflected: true as const,
                        types: [{
                                kind: "stringLiteral" as const,
                                __isReflected: true as const,
                                value: "text" as const
                            }, {
                                kind: "stringLiteral" as const,
                                __isReflected: true as const,
                                value: "email" as const
                            }, {
                                kind: "stringLiteral" as const,
                                __isReflected: true as const,
                                value: "phone" as const
                            }] as const
                    } as const,
                    prompt: {
                        kind: "string" as const,
                        __isReflected: true as const
                    } as const,
                    placeholder: {
                        kind: "string" as const,
                        __isReflected: true as const
                    } as const,
                    isRequired: {
                        kind: "boolean" as const,
                        __isReflected: true as const
                    } as const
                } as const
            } as const
        } as const
    } as const
} as unknown as Reflected<IEventRegistrationInfoType>;