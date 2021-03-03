import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';

interface UserModel extends IUser, mongoose.Document { };

const userSchema: mongoose.Schema = new mongoose.Schema({
    email: String,
    otpCode: String,
}, { timestamps: true });

const User = mongoose.model<UserModel>("User", userSchema, 'users');

export default User;
