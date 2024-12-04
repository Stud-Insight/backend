import ResponseWrapper from '@/classes/ResponseWrapper';
import { Request, Response } from 'express';
import genForgotToken from '../generators/ForgotTokenGen';
import User from '@/models/User';

const handleForgot = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    const email: string = req.body?.email;
    if(!email) { responseWrapper.sendError(400, "BAD_REQUEST", "Adresse mail manquante."); return; }

    const forgotToken = genForgotToken({ email });
    const user = await User.findOneAndUpdate({ email }, { forgotToken });
    if(!user) { responseWrapper.sendError(404, "USER_NOT_FOUND"); return; }

    /*
        #################################################
        ENVOYER LE MAIL DE CHANGEMENT DE MOT DE PASSE ICI
        #################################################
    */

    res.status(200).send("Mail de réinitialisation de mot de passe envoyé avec succès.");
}

export default handleForgot;