import supertestServer from "../../../__tests__/app.test";

describe('sent otp to user', () => {
    it('successfully sent otp to user', () => {
        supertestServer
            .post('/authentication/sent-otp')
            .send({ email: 'ss@ee.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });
})

describe('otp code verify endpoint', () => {
    it('failed otp verification', () => {
        supertestServer
            .post('/authentication/verify-otp')
            .send({ email: 'ss@ee.com', otpCode: '1111' })
            .expect(400)
    });
})