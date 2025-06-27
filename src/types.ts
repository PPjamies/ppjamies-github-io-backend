export interface EmailRequest {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    message: string;
    sendCopy: boolean;
}

export interface Limit {
    email: string;
    count: number;
}