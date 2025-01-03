import { observer, ObserverContext, GetOptions} from "@triframe/scribe";
import { EventRegistrationInfo } from "./EventRegistrationInfo";

export const getEventRegistrationInfo = observer(async <S>({ observe }: ObserverContext, publicRegistrationKey: string, options: GetOptions<typeof EventRegistrationInfo, S>) => {
    return await observe(EventRegistrationInfo.withPublicRegistrationKey(publicRegistrationKey).get(options));
})
