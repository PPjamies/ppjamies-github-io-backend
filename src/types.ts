export interface Email {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    message: string;
    sendCopy: boolean;
}

export interface EmailThreshold {
    limit: number;
    count: number;
    date: number;
}

export interface Limiter {
    email: string;
    count: number;
    isBlocked: boolean;
    dateLastBlocked: number;
}