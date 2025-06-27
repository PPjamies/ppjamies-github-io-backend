import {setTimeout} from 'timers';
import EmailCache from '../src/services/email-cache-service'

const JOB_KICKOFF_EVERY_24_HOURS_MS = 24 * 60 * 60 * 1000;

function scheduleMidnightJob(job: () => void) {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    setTimeout(() => {
        job();
        setInterval(job, JOB_KICKOFF_EVERY_24_HOURS_MS);
    }, msUntilMidnight);
}

scheduleMidnightJob(() => {
    EmailCache.clear();
    EmailCache.write();
});