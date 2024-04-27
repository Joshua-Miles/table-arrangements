import { AmbassadorClient } from "@triframe/ambassador";

export function ping(this: AmbassadorClient | void): Promise<string> {
    let api = AmbassadorClient.get(this, process.env.API_URL as string);
    return api.callRemoteFunction("ping");
}