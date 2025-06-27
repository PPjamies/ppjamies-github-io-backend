import {NextFunction, Request, Response} from 'express';
import {fail} from '../utils/response-utils';

interface GlobalError extends Error {
    statusCode?: number;
}

function globalErrorHandler(
    err: GlobalError,
    request: Request,
    response: Response,
    next: NextFunction
) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    fail(response, statusCode, [message]);
}

export default globalErrorHandler;