import { Client } from "@triframe/proprietor";
import { GetOptions, observer, ObserverContext } from "@triframe/scribe";
import { Session } from "../Session";
import { Users } from "./User";
import { UserWithWorkspaces } from "./UserWithWorkspaces";

type Options<S> = GetOptions<typeof UserWithWorkspaces, S>

export const getLoggedInUser = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, options: Options<S>) => {
    const { loggedInUserId } = await observe(client.getSession());

    if (loggedInUserId === null) return null;

    return await observe( UserWithWorkspaces.withId(loggedInUserId).get(options))
})
