import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import EmailCache from '../services/email-cache-service';
import {sendEmail} from '../services/email-service';
import {EmailRequest, Limit} from '../types';
import {fail, success} from '../utils/response-utils';

export async function handleContact(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return fail(response, 400, errors.array());
    }

    let {email} = request.body as EmailRequest;

    if (!EmailCache.hasCapacity()) {
        return fail(response, 400, ['Email capacity reached']);
    }

    if (EmailCache.hasReachedDailyLimit(email)) {
        return fail(response, 400, ['Daily email limit reached']);
    }

    try {
        await sendEmail(request.body);

        let limit: Limit | undefined = EmailCache.get(email) || {email, count: 0};
        limit!.count++;
        EmailCache.put(email, limit);

        return success(response, {message: 'Email sent'});
    } catch (e) {
        return fail(response, 400, ['Failed to send email']);
    }
}