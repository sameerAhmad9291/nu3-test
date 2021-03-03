import { config } from 'dotenv';
config(); // dotenv config

import mongoose from "mongoose";

import app from './app';
const port = process.env.SERVER_PORT || 8080;

(async function () {
    mongoose.connect(process.env.MONGO_DB_CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err)
            console.error(err)
        else {
            console.info('connected to db');
        }
    });
})();

app.listen(port, (): void => {
    console.log(`server is listening on ${port}`);
});