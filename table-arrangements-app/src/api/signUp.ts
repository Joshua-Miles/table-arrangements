import { AmbassadorClient } from "@triframe/ambassador";

export function signUp(this: AmbassadorClient | void, options: {
    firstName: string;
    lastName: string;
    organizationName?: undefined | string;
    email: string;
    password: string;
}): Promise<(number & {
    __serial__?: undefined | true;
}) | {
    isFailure: true;
    code: "emailIsInvalid";
} | {
    isFailure: true;
    code: "passwordTooShort";
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
    return api.callRemoteFunction("signUp", options);
}