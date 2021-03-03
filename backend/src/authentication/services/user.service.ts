import jwt from 'jsonwebtoken';

import { IUser } from "../interfaces/user.interface"
import User from "../models/user.model"

const getOTP = () => {
    return Math.round(Math.random() * 10000).toString()
}

export const sentOTP = async (email): Promise<IUser> => {
    const user = await User.findOneAndUpdate({
        email
    }, {
        otpCode: getOTP(),
    }, {
        upsert: true,
        new: true,
    }).lean();

    return user;
}

export const verifyOTP = async (email, otpCode): Promise<IUser> => {
    const user = await User.findOne({
        email
    }).lean();

    if (user.otpCode === otpCode) {
        return user;
    } else {
        throw new Error('Unable to verify otpCode');
    }
}

export const getJWT = async (user: IUser): Promise<any> => {
    const jwtData = await jwt.sign(user, 'secret', { expiresIn: '1h' });
    return jwtData;
}
