import path from 'path';
import supertestServer from "../../../__tests__/app.test";

describe('file uploads', () => {
    it('successfully file uploads', () => {

        supertestServer
            .post('/file-storage')
            .type('form')
            .field('files', path.resolve(__dirname, '/fixtures/products.xml'))
            .field('files', path.resolve(__dirname, '/fixtures/inventory.csv'))
            .expect(200)
    });
})