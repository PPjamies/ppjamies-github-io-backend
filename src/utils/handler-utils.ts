import {NextFunction, Request, RequestHandler, Response} from 'express';

export function asyncHandler(
    handler: (request: Request, response: Response, next: NextFunction) => Promise<any>
): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
        handler(request, response, next).catch(next);
    };
}