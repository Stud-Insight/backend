import ResponseWrapper from '@/classes/ResponseWrapper';
import RefreshTokenPayload from '@/interfaces/tokens/RefreshTokenPayload';
import User from '@/models/User';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const handleLogout = (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    const cookies = req.cookies;
    console.log("Cookies reçus:", cookies);

    if(!cookies?.refreshToken) { responseWrapper.sendError(400, "BAD_REQUEST", "Jeton de rafraîchissement manquant."); return; }
    
    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET IS NOT DEFINED");

    jwt.verify(cookies.refreshToken as string, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if(err || !decoded) { responseWrapper.sendError(401, "INVALID_TOKEN"); return; }

        const decodedPayload = decoded as RefreshTokenPayload;
    
        const user = await User.findById(decodedPayload.userId);
        if(!user) throw new Error("The user who tried to logout doesn't exist in the database.");

        if(!decodedPayload.jti || !user.refreshTokens.map(rfTk => rfTk.jti).includes(decodedPayload.jti)) { responseWrapper.sendError(401, "INVALID_TOKEN"); return; }

        await User.findByIdAndUpdate(
            user.id,
            { $pull: { refreshTokens: { $or: [{ jti: decodedPayload.jti }, { ip: req.ip }] } } }
        );

        res.status(200).send("Unauthentification successful.")
    });

}

export default handleLogout;