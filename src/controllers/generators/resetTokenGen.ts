import ResetTokenPayload from '@/interfaces/tokens/ResetTokenPayload';
import jwt from 'jsonwebtoken';
import config from 'config';

const genResetToken = (payload: ResetTokenPayload) => {
    if(!process.env.PASSWORD_RESET_TOKEN_SECRET) throw new Error("PASSWORD_RESET_TOKEN_SECRET NOT FOUND");
    const passwordResetToken = jwt.sign(
        payload,
        process.env.PASSWORD_RESET_TOKEN_SECRET,
        { expiresIn: config.get("server.tokens.reset.duration") }
    );
    return passwordResetToken;
}

export default genResetToken;