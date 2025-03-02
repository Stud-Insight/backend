import jwt from 'jsonwebtoken';
import ms from 'ms';

import RefreshTokenPayload from '@/interfaces/tokens/RefreshTokenPayload';
import { v4 as uuidv4 } from 'uuid';
import config from '@config/config';

const genRefreshToken = (payload: RefreshTokenPayload) => {
    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET NOT FOUND");
    const jti = uuidv4();
    payload.jti = jti;
    const rfTkDuration: string = config.server.tokens.refresh.duration;
    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: rfTkDuration }
    );
    return { refreshToken, jti, exp: new Date(Date.now() + ms(rfTkDuration)) };
}

export default genRefreshToken;