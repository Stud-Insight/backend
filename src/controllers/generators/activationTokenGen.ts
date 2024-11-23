import jwt, { JwtPayload } from 'jsonwebtoken';

export interface ActivationTokenPayload extends JwtPayload {
    id: String
}

const genActivationToken = (payload: ActivationTokenPayload) => {
    if(!process.env.ACTIVATION_TOKEN_SECRET) throw new Error("ACTIVATION_TOKEN_SECRET NOT FOUND");
    const activationToken = jwt.sign(
        payload,
        process.env.ACTIVATION_TOKEN_SECRET
    );
    return activationToken;
}

export default genActivationToken;