import User from '@/models/User';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import genAccessToken, { AccessTokenPayload } from '../generators/accessTokenGen';
import { getRolesFromUserId } from '@/utils/roles';

const handleRefresh = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    console.log("COOKIES!!!!!!!!");
    console.log(cookies);

    if(!cookies?.refreshToken) { res.status(400).send("Jeton de rafraîchissement manquant."); return; }

    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET IS NOT DEFINED");

    jwt.verify(cookies.refreshToken as string, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if(err || !decoded) { res.sendStatus(401); return; }
        
        const decodedPayload = decoded as AccessTokenPayload;
        
        const user = await User.findOne({ id: decodedPayload.id });
        if(!user) throw new Error("The user who requested a new access token doesn't exist in the database.");

        const userRoles = await getRolesFromUserId(user.id);

        const newAccessToken = genAccessToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: userRoles
        });

        res.json({ accessToken: newAccessToken });
    });

}

export default handleRefresh;