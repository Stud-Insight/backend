import RefreshTokenPayload from '@/interfaces/tokens/RefreshTokenPayload';
import config from 'config';
import jwt from 'jsonwebtoken';

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