import config from 'config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export interface RefreshTokenPayload extends JwtPayload {
    id: ObjectId
}

const genRefreshToken = (payload: RefreshTokenPayload) => {
    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET NOT FOUND");
    const accessToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: config.get("server.tokens.refresh.duration") }
    );
    return accessToken;
}

export default genRefreshToken;