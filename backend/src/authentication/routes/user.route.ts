import * as express from 'express';
import { sentOTPRequest, verifyOTPRequest } from '../controllers/user.controller';

const router = express.Router();

router.post('/sent-otp', sentOTPRequest);
router.post('/verify-otp', verifyOTPRequest);

export default router;