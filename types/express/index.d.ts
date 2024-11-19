import { AccessTokenPayload } from '@/controllers/generators/accessTokenGen';
import 'express';
import 'mongoose';

declare module 'express' {
    export interface Request {
        authDecoded?: AccessTokenPayload;
    }
}