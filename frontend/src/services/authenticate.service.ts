import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    sentOTP(email: string) {
        return this.http.post<any>(`${config.apiUrl}/authentication/sent-otp`, { email })
            .pipe(map(user => {
                return user;
            }));
    }

    verifyOTP(email: string, otpCode: string) {
        return this.http.post<any>(`${config.apiUrl}/authentication/verify-otp`, {
            email,
            otpCode,
        })
            .pipe(map(user => {
                return user;
            }));
    }
}