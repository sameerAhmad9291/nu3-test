import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

import app from "../app";

let supertestServer: request.SuperTest<request.Test>;

describe('app test', () => {
    let mongod;
    supertestServer = request(app);

    beforeAll(async () => {
        mongod = new MongoMemoryServer();
        const mongoURI = await mongod.getUri();
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    })

    it('call alive endpoint', (done) => {
        supertestServer
            .get('/alive')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
})

export default supertestServer;