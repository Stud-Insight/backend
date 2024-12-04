import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { connectDatabase } from '@/utils/database';
import { checkAdminExists, createAdminUser } from './utils/setup';
import { corsOptions } from './config/corsOptions';
import scheduleTokenCleanup from '../routines/scheduleTokenCleanup';

dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI || '';
const PORT = process.env.PORT || '8080';
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));

app.use('/auth', require('@routes/auth'));
app.use('/attachments', require('@routes/attachments'));

connectDatabase(DATABASE_URI).then(async () => {
    const adminExists = await checkAdminExists();
    if (!adminExists) createAdminUser();

    app.listen(PORT, () => {
        console.log(`[🔥] Server listening on port ${PORT}`);
    });
});


scheduleTokenCleanup();