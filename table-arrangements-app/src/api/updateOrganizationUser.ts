import { AmbassadorClient } from "@triframe/ambassador";

export function updateOrganizationUser(this: AmbassadorClient | void, organizationId: number, userId: number, options: {
    role: number;
    firstName: string;
    lastName: string;
    email: string;
} & {
    password?: undefined | string;
}): Promise<{
    isFailure: true;
    code: "emailIsInvalid";
} | {
    isFailure: true;
    code: "passwordTooShort";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    organizationId: number;
    role: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordDigest: string;
} | {
    isFailure: true;
    code: "userUnauthorized";
} | {
    isFailure: true;
    code: "firstNameIsEmpty";
} | {
    isFailure: true;
    code: "lastNameIsEmpty";
} | {
    isFailure: true;
    code: "emailIsInUse";
}> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("updateOrganizationUser", organizationId, userId, options);
}