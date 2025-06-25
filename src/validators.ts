import {body} from "express-validator";

export const emailValidators = [
    body('firstname')
        .trim()
        .notEmpty()
        .withMessage('Empty field: firstname'),

    body('lastname')
        .trim()
        .notEmpty()
        .withMessage('Empty field: lastname'),

    body('email')
        .isEmail().normalizeEmail()
        .withMessage('Invalid field: email'),

    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Empty field: subject'),

    body('message')
        .trim()
        .notEmpty()
        .withMessage('Empty field: message'),

    body('sendCopy')
        .toBoolean()
        .isBoolean()
        .withMessage('Invalid field: sendCopy')
];