import User from '@/models/User';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import genAccessToken from '../generators/accessTokenGen';
import { getRolesFromUserId } from '@/utils/roles';
import ResponseWrapper from '@/classes/ResponseWrapper';
import AccessTokenPayload from '@/interfaces/tokens/AccessTokenPayload';
import RefreshTokenPayload from '@/interfaces/tokens/RefreshTokenPayload';
import genRefreshToken from '../generators/refreshTokenGen';
import config from 'config';
import ms from 'ms';

const handleRefresh = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    const cookies = req.cookies;

    if(!cookies?.refreshToken) { responseWrapper.sendError(400, "BAD_REQUEST", "Jeton de rafraîchissement manquant."); return; }

    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET IS NOT DEFINED");

    jwt.verify(cookies.refreshToken as string, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if(err || !decoded) { responseWrapper.sendError(401, "INVALID_TOKEN"); return; }
        
        const decodedPayload = decoded as RefreshTokenPayload;
        
        const user = await User.findById(decodedPayload.userId);
        if(!user) throw new Error("The user who requested a new access token doesn't exist in the database.");

        if(user.refreshToken != decodedPayload.jti) { responseWrapper.sendError(401, "INVALID_TOKEN"); return; }

        const userRoles = await getRolesFromUserId(user.id);

        const newAccessToken = genAccessToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: userRoles
        });

        /*
            Pour plus de sécurité, il est possible de regénérer un refreshToken à
            chaque demande d'un nouvel accessToken afin de réduire les chances
            de vol et d'utilisation d'anciens tokens.  
        */

        /*
        const { refreshToken: newRefreshToken, jti: newJti } = genRefreshToken({
            userId: user.id
        });

        await User.findByIdAndUpdate(
            user.id,
            { refreshToken: newJti }
        );

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        */

        const accessTokenMaxAge = parseInt(ms(config.get('server.tokens.access.duration'))) / 1000;

        res.status(200).json({ access: { token: newAccessToken, maxAge: accessTokenMaxAge } });
    });

}

export default handleRefresh;