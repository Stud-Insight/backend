import { Request } from 'express';
import { AccessTokenPayload } from "@/controllers/generators/accessTokenGen";

interface AuthRequestWrapper extends Request {
    authDecoded?: AccessTokenPayload;
}

export default AuthRequestWrapper;