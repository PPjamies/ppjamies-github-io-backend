import express, {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {emailValidators} from './validators';
import {Email} from './types'

const app = express();
const port = 3000;

app.use(express.json());

app.post('/contact', emailValidators, (request: Request, response: Response): void => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({errors: errors.array()});
        return;
    }

    const {firstname, lastname, email, subject, message, sendCopy} = request.body as Email;

    //
    response.send("hi");
});

app.listen(port);