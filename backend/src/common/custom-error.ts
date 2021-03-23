export class CustomError extends Error {
    errorCode: string;
    constructor(errorMsg: string, error_code: string) {
        super(errorMsg);
        this.errorCode = error_code;
    }
} 