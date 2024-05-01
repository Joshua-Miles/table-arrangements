import { persist, Serial } from "@triframe/scribe";

export type Party = {
    id: Serial
    name: string
}

export const Parties = persist<Party>()
    .primaryKey('id');
