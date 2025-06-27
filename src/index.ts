import rateLimit from 'express-rate-limit';
import express, {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {emailValidators} from './validators';
import EmailCache from './service/email-cache-service'
import {sendEmail} from './service/email-service';
import {EmailRequest, Limit} from './types'

const app = express();
const port = 3000;
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3
});

app.use(express.json());
app.use(limiter)

app.post('/contact', emailValidators, async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({errors: errors.array()});
        return;
    }

    let emailRequest = request.body as EmailRequest;
    let email = emailRequest.email;

    if (!EmailCache.hasCapacity()) {
        response.status(400).json({errors: 'email capacity reached'});
        return;
    }

    if (EmailCache.hasReachedDailyLimit(email)) {
        response.status(400).json({errors: 'daily limit per email reached'});
        return;
    }

    try {
        await sendEmail(emailRequest);

        let limit: Limit | undefined = EmailCache.get(email) || {email, count: 0};
        limit.count++;
        EmailCache.put(email, limit);

        response.status(200).json({"data": "hi!"});
    } catch (e) {
        response.status(400).json({errors: e});
    }
});

app.listen(port);