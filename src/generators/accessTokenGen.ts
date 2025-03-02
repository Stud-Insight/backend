import jwt from 'jsonwebtoken';
import AccessTokenPayload from '@/interfaces/tokens/AccessTokenPayload';
import config from '@config/config';

const genAccessToken = (payload: AccessTokenPayload) => {
    if(!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET NOT FOUND");
    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: config.server.tokens.access.duration }
    );
    return accessToken;
}

export default genAccessToken;