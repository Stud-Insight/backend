import RefreshTokenPayload from '@/interfaces/tokens/RefreshTokenPayload';
import config from 'config';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { v4 as uuidv4 } from 'uuid';

const genRefreshToken = (payload: RefreshTokenPayload) => {
    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET NOT FOUND");
    const jti = uuidv4();
    payload.jti = jti;
    const rfTkDuration: string = config.get('server.tokens.refresh.duration');
    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: rfTkDuration }
    );
    return { refreshToken, jti, exp: Date.now() + ms(rfTkDuration) };
}

export default genRefreshToken;