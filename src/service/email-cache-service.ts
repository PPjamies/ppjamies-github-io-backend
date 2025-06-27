import fs from 'fs';
import path from 'path';
import {Limit} from "../types";
import {format} from "date-fns";

const DAILY_LIMIT = 3;
const DAILY_CAPACITY = 30;
const CACHE_META_PATH: string = path.join(__dirname, '../meta/meta.json');

class EmailCacheService {
    private map = new Map<string, Limit>();
    private count = 0;

    clear() {
        this.map.clear();
        this.count = 0;
    }

    write() {
        let today = format(new Date(), 'MM-dd-yyyy');
        fs.writeFileSync(CACHE_META_PATH, JSON.stringify({'clearedOn': today}, null, 2));
    }

    hasCapacity() {
        return this.count < DAILY_CAPACITY;
    }

    hasReachedDailyLimit(email: string) {
        return this.map.has(email) && this.map.get(email)!.count >= DAILY_LIMIT;
    }

    get(email: string) {
        return this.map.get(email);
    }

    put(email: string, limit: Limit) {
        this.map.set(email, limit);
        this.count++;
    }
}

export default new EmailCacheService();