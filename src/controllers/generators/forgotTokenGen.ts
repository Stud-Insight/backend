import ForgotTokenPayload from '@/interfaces/tokens/ForgotTokenPayload';
import jwt from 'jsonwebtoken';
import config from 'config';

const genForgotToken = (payload: ForgotTokenPayload) => {
    if(!process.env.PWD_FORGOT_TOKEN_SECRET) throw new Error("PWD_FORGOT_TOKEN_SECRET NOT FOUND");
    const pwdForgotToken = jwt.sign(
        payload,
        process.env.PWD_FORGOT_TOKEN_SECRET,
        { expiresIn: config.get("server.tokens.forgot.duration") }
    );
    return pwdForgotToken;
}

export default genForgotToken;