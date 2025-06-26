import fs from 'fs';
import path from 'path';
import {Email, Limit} from "../types";
import {format} from "date-fns";

const MAX_CAPACITY = 50;
const MAX_DAILY_USAGE = 3;
const CACHE_META_PATH: string = path.join(__dirname, '../meta/meta.json');

class EmailCache {
    private map = new Map<string, Limit>();

    clear() {
        this.map.clear();
    }

    write() {
        let today = format(new Date(), 'MM-dd-yyyy');
        fs.writeFileSync(CACHE_META_PATH, JSON.stringify({"clearedOn": today}, null, 2));
    }

    put(email: string, limit: Limit) {
        if (this.map.size >= MAX_CAPACITY) {
            return false;
        }

        this.map.set(email, limit);
    }
}

export default new EmailCache();