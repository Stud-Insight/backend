import ResponseWrapper from '@/classes/ResponseWrapper';
import ForgotTokenPayload from '@/interfaces/tokens/ResetTokenPayload';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '@/models/User';

const handleReset = (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    const forgotToken = req.params?.token;
    if(!forgotToken) { responseWrapper.sendError(400, "BAD_REQUEST", "Jeton de réinitialisation manquant."); return; }

    const newPassword: string = req.body?.password;
    if(!newPassword) { responseWrapper.sendError(400, "BAD_REQUEST", "Mot de passe manquant."); return; }

    if(!process.env.PASSWORD_RESET_TOKEN_SECRET) throw new Error("PASSWORD_RESET_TOKEN_SECRET IS NOT DEFINED.");
    jwt.verify(forgotToken, process.env.PASSWORD_RESET_TOKEN_SECRET, async (err, decoded) => {
        if(err || !decoded) { responseWrapper.sendError(401, "INAVLID_TOKEN"); return; }

        const decodedPayload = decoded as ForgotTokenPayload;
        const email = decodedPayload.email;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({ email }, {
            $unset: { resetToken: "" },
            password: hashedPassword
        });

        res.status(200).send("Mot de passe réinitialisé avec succès.");
    });

}

export default handleReset;