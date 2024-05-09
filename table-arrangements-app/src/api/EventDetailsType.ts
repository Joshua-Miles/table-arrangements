import type { Reflected } from "@triframe/ambassador";

type IEventDetailsType = {
    id: number & {
        __serial__?: undefined | true;
    };
    workspaceId: number;
    name: string;
    roomWidth: null | number;
    roomLength: null | number;
    defaultTableFixtureTemplateId: null | number;
    tables: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        label: string;
        orderby: number;
        capacity: number;
        fixtureId: null | number;
    }[];
    tags: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        label: string;
        color: string;
    }[];
    fixtureTemplates: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        label: string;
        shape: "round" | "rectangle";
        color: string;
        width: number;
        length: number;
    }[];
    fixtures: {
        id: number & {
            __serial__?: undefined | true;
        };
        eventId: number;
        templateId: number;
        x: number;
        y: number;
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
        workspaceId: {
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
        defaultTableFixtureTemplateId: {
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
        fixtureTemplates: {
            kind: "array" as const,
            of: {
                kind: "object" as const,
                __isReflected: true as const,
                name: "FixtureTemplate" as const,
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
                    width: {
                        kind: "number" as const,
                        __isReflected: true as const
                    } as const,
                    length: {
                        kind: "number" as const,
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