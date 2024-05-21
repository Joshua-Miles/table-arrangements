import { serve } from '@triframe/proprietor';
import { Session } from './Session';
import { Globals as ScribeGlobals } from '@triframe/scribe';
import { createGCPFileStore } from '@triframe/gcp-file-store';
import { PublicUserInterface } from './User';
import { PublicEventInterface } from './Event';
import { PublicOrganizationInterface } from './Organization';

if (process.env.BUCKET_NAME) {
    ScribeGlobals.fileStore = createGCPFileStore(process.env.BUCKET_NAME);
}

const PublicInterface = {
    ...PublicUserInterface,
    ...PublicOrganizationInterface,
    ...PublicEventInterface
}

serve(PublicInterface, {
    initialSession: (): Session => ({ loggedInUserId: null })
})

console.log('Started API on Port', process.env.API_PORT)