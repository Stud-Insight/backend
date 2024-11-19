import { IRole } from '@/models/Role';
import config from 'config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AccessTokenPayload extends JwtPayload {
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    roles: IRole[]
}

const genAccessToken = (payload: AccessTokenPayload) => {
    if(!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET NOT FOUND");
    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: config.get("server.tokens.access.duration") }
    );
    return accessToken;
}

export default genAccessToken;