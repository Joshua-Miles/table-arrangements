import { persist, Serial } from "@triframe/scribe";

export type User = {
    id: Serial;
    firstName: string;
    lastName: string;
    email: string;
    passwordDigest: string;
}

export const Users = persist<User>()
    .primaryKey('id')
    .uniqueIndexBy('email');
