import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import { connectDatabase } from '@/utils/database';
import { checkAdminExists, createAdminUser } from './utils/setup';

dotenv.config();

const DATABASE_URI = (process.env.DATABASE_URI as string) || '';
const PORT = config.get('server.port') || '8080';
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDatabase(DATABASE_URI).then(async () => {
    const adminExists = await checkAdminExists();
    if (!adminExists) createAdminUser();
});

app.use('/auth', require('@routes/auth'));
app.use('/attachments', require('@routes/attachments'));

app.listen(PORT, () => {
    console.log(`[Backend] Server listening on port ${PORT}`);
});
