import rateLimit from 'express-rate-limit';
import express, {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {emailValidators} from './validators';
import {Email} from './types'

const app = express();
const port = 3000;
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3
});

app.use(express.json());
app.use(limiter)

app.post('/contact', emailValidators, (request: Request, response: Response): void => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({errors: errors.array()});
        return;
    }

    const {firstname, lastname, email, subject, message, sendCopy} = request.body as Email;

    // cache - check the email limit (users can only send 3 emails a day)

    // cache/or file - check if server has reached its maximum limit of emails per day

    // send email

    response.status(200).json({"data": "hi!"});
});

app.listen(port);