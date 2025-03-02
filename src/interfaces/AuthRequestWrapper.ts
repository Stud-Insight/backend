import { Request } from 'express';
import AccessTokenPayload from './tokens/AccessTokenPayload';

interface AuthRequestWrapper extends Request {
    authDecoded?: AccessTokenPayload;
}

export default AuthRequestWrapper;