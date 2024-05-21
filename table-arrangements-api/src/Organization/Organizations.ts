import { persist, Serial } from "@triframe/scribe";

export type Organization = {
    id: Serial;
    name: string;
}

export const Organizations = persist<Organization>()
    .primaryKey('id');
