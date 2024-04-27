import { serve } from '@triframe/proprietor';
import { Session } from './Session';
import { Globals as ScribeGlobals } from '@triframe/scribe';
import { createGCPFileStore } from '@triframe/gcp-file-store';

if (process.env.BUCKET_NAME) {
    ScribeGlobals.fileStore = createGCPFileStore(process.env.BUCKET_NAME);
}

const PublicInterface = {
    ping(){
        return 'pong'
    }
}

serve(PublicInterface, {
    initialSession: (): Session => ({ loggedInUserId: null, isSuperUser: false})
})

console.log('Started API on Port', process.env.API_PORT)