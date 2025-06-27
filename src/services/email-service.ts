import nodemailer from 'nodemailer'
import {EmailRequest} from '../types';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
});

export async function sendEmail(email: EmailRequest) {
    const adminEmail = process.env.GOOGLE_EMAIL;

    email.message += '\n-' + email.firstname + ' ' + email.lastname;

    const adminMail = {
        from: adminEmail,
        to: adminEmail,
        subject: email.subject,
        text: email.message
    };

    const clientMail = {
        from: adminEmail,
        to: email.email,
        subject: email.subject,
        text: email.message
    };

    await transporter.sendMail(adminMail);

    if (email.sendCopy) {
        await transporter.sendMail(clientMail);
    }

    return true;
}
