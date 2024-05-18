import { AmbassadorClient } from "@triframe/ambassador";

export function logout(this: AmbassadorClient | void): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("logout");
}