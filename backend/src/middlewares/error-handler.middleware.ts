import * as Express from 'express';
import { CustomError } from "../common/custom-error"

export const errorHandlerMiddleware = (err: CustomError, req: Express.Request, res: Express.Response, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const errorCode = err.errorCode;
    const message = err.message;
    if (errorCode) {
        res.send({
            message,
            code: errorCode
        }).status(400)
    } else {
        console.error(err);
        res.send({
            message: 'Internal server error',
            code: errorCode
        }).status(500);
    }
}