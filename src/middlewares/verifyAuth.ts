import { AccessTokenPayload } from '@/controllers/generators/accessTokenGen';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;

    if(!authHeader?.startsWith('Bearer ')) { res.sendStatus(401); return; }
    const accessToken = authHeader.split(' ')[1];

    if(!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET IS NOT DEFINED.");
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err || !decoded) { res.sendStatus(401); return; }
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