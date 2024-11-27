import ResponseWrapper from '@/classes/ResponseWrapper';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import ActivationTokenPayload from '@/interfaces/tokens/ActivationTokenPayload';

const handleActivation = (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    const activationToken = req.params?.token;
    if(!activationToken) responseWrapper.sendError(400, "BAD_REQUEST", "Jeton d'activation manquant.")

    const newPassword: string = req.body?.password;
    if(!newPassword) responseWrapper.sendError(400, "BAD_REQUEST", "Mot de passe manquant.") 

    if(!process.env.ACTIVATION_TOKEN_SECRET) throw new Error("ACTIVATION_TOKEN_SECRET IS NOT DEFINED.");
    jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET, async (err, decoded) => {
        if(err || !decoded) { responseWrapper.sendError(401, "INAVLID_TOKEN"); return; }

        const decodedPayload = decoded as ActivationTokenPayload;
        const userId = decodedPayload.id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, {
            $unset: { activationToken: "" },
            activationDate: new Date(),
            password: hashedPassword
        });

        res.status(200).send("Account activation successfully realized.");

    });

}

export default handleActivation;