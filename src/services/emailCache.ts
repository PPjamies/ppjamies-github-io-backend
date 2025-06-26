import {format} from 'date-fns';
import fs from 'fs';
import path from 'path';
import {Email, Limit} from '../types';


const DAILY_LIMIT_PER_PERSON = 3;

const emailCache = new Map<string, Limit>();

const cacheMetaPath: string = path.join(__dirname, '../meta/meta.json');

const getToday = () => format(new Date(), 'MM-dd-yyyy');

const clearCache = () => {
    let lastCleared: string;
    if (fs.existsSync(cacheMetaPath)) {
        const raw = fs.readFileSync(cacheMetaPath, 'utf-8');
        const meta = JSON.parse(raw);
        lastCleared = meta.clearedOn;
    }

    const today = getToday();
    if (lastCleared !== today) {
        emailCache.clear();
        fs.writeFileSync(cacheMetaPath, JSON.stringify({clearedOn: today}));
        console.log('Email meta cleared!');
    }
};

const sendEmail = (email: Email) => {
    if (emailCache.size >= DAILY_LIMIT) {
        return false;
    }

    let emailAddress = email.email;

    let limit: Limit | null;
    if (emailCache.has(emailAddress)) {
        limit = emailCache.get(emailAddress)!;
    } else {
        limit = {
            email: emailAddress,
            count: 0,
        }
    }

    if (limit.count >= DAILY_LIMIT_PER_PERSON) {
        return false;
    }

    // todo: send email

    limit.count++;
    emailCache.set(emailAddress, limit);
}
