import type { Reflected } from "@triframe/ambassador";

type IEventDetailsType = {
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
    tables: {
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
    }[];
    tags: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        label: string;
        color: string;
    }[];
    fixtures: {
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
    }[];
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
    parties: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        tableId: null | number;
        orderby: null | number;
        name: string;
        color: string;
        attendees: {
            id: number & {
                __serial__?: undefined | true;
            };
            partyId: number;
            tagId: null | number;
            name: string;
        }[];
    }[];
};

export const EventDetailsType = {
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
        tables: {
            kind: "array" as const,
            of: {
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
            } as const
        } as const,
        tags: {
            kind: "array" as const,
            of: {
                kind: "object" as const,
                __isReflected: true as const,
                name: "Tag" as const,
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
                    color: {
                        kind: "string" as const,
                        __isReflected: true as const
                    } as const
                } as const
            } as const
        } as const,
        fixtures: {
            kind: "array" as const,
            of: {
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
            } as const
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
        } as const,
        parties: {
            kind: "array" as const,
            of: {
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
                    eventId: {
                        kind: "number" as const,
                        __isReflected: true as const
                    } as const,
                    tableId: {
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
                    orderby: {
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
                    name: {
                        kind: "string" as const,
                        __isReflected: true as const
                    } as const,
                    color: {
                        kind: "string" as const,
                        __isReflected: true as const
                    } as const,
                    attendees: {
                        kind: "array" as const,
                        of: {
                            kind: "object" as const,
                            __isReflected: true as const,
                            name: "Attendee" as const,
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
                                partyId: {
                                    kind: "number" as const,
                                    __isReflected: true as const
                                } as const,
                                tagId: {
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
                                name: {
                                    kind: "string" as const,
                                    __isReflected: true as const
                                } as const
                            } as const
                        } as const
                    } as const
                } as const
            } as const
        } as const
    } as const
} as unknown as Reflected<IEventDetailsType>;