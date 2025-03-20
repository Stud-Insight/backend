import ResponseWrapper from '@/classes/ResponseWrapper';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AccessTokenPayload from '@/interfaces/tokens/AccessTokenPayload';

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const responseWrapper = new ResponseWrapper(res);
    const authHeader = req.headers.authorization || req.headers.Authorization as string;

    if(!authHeader?.startsWith('Bearer ')) { responseWrapper.sendError(401, "AUTHENTIFICATION_REQUIRED"); return; }
    const accessToken = authHeader.split(' ')[1];

    if(!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET IS NOT DEFINED.");
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err || !decoded) { responseWrapper.sendError(401, "INVALID_TOKEN"); return; }
        /*
            Remarque: la méthode verify prend automatiquement en compte le
            calcul de l'expiration du token. Il n'est donc pas nécessaire
            de la vérifier manuellement.
        */
        req.authDecoded = decoded as AccessTokenPayload;
        next();
    });
}


export default verifyAuth;