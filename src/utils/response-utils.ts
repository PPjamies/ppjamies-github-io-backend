import {Response} from 'express';

export function success(response: Response, data: any = {}, code: number = 200): Response {
    return response.status(code).json({
        success: true,
        data
    });
}

export function fail(response: Response, code: number = 400, errors: any): Response {
    return response.status(code).json({
        success: false,
        errors
    });
}