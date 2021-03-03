import * as express from 'express';
import { sentOTP, verifyOTP, getJWT } from '../services/user.service';

export const sentOTPRequest = async (req: express.Request, res: express.Response): Promise<void> => {
    const { email } = req.body;
    await sentOTP(email);
    res.send({ sent: true });
}

export const verifyOTPRequest = async (req: express.Request, res: express.Response): Promise<void> => {
    const { email, otpCode } = req.body;
    try {
        const user = await verifyOTP(email, otpCode);
        const jwtData = await getJWT(user);
        res.send({ jwtData });
    } catch (error) {
        res.status(400)
        res.send(error.message);
    }
}