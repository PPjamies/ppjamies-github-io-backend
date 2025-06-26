import rateLimit from 'express-rate-limit';
import express, {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {emailValidators} from './validators';
import EmailCache from './email-cache'
import {Email, Limit} from './types'

const app = express();
const port = 3000;
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3
});

const DAILY_LIMIT_PER_EMAIL = 3;

app.use(express.json());
app.use(limiter)

app.post('/contact', emailValidators, (request: Request, response: Response): void => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({errors: errors.array()});
        return;
    }

    const {firstname, lastname, email, subject, message, sendCopy} = request.body as Email;

    if (!EmailCache.hasCapacity()) {
        response.status(400).json({errors: 'email capacity reached'});
    }

    let limit: Limit | undefined = EmailCache.get(email);
    if (!limit) {
        limit = {
            email: email,
            count: 0
        };
    }

    if (limit.count >= DAILY_LIMIT_PER_EMAIL) {
        response.status(400).json({errors: 'daily limit per email reached'});
    }

    // todo: send the email

    limit.count++;
    EmailCache.put(email, limit);

    response.status(200).json({"data": "hi!"});
});

app.listen(port);