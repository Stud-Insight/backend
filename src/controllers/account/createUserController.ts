import { Request, Response } from 'express';
import mongoose from "mongoose";
import ResponseWrapper from '@/classes/ResponseWrapper';
import genResetToken from '@/generators/resetTokenGen';
import User from '@/models/User';
import genActivationToken from '@/generators/activationTokenGen';
import sendMail from "@/utils/mailer";
import EmailSubjects from '@/enums/emailSubjects';


const handleUserCreation = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    console.log('dled')
    const email: string = req.body?.email;
    const Lname: string = req.body?.lastName;
    const Fname: string = req.body?.firstName;
    if(!email) { responseWrapper.sendError(400, "BAD_REQUEST", "Adresse mail manquante."); return; }

    
        console.log('creatUser')
        const id = new mongoose.Types.ObjectId();
        const activationToken = genActivationToken({ id: String(id)});
        const user = new User({
            _id: id,
            lastName: Lname,
            firstName: Fname, 
            email: email,
            password: null,
            activationToken: activationToken
        });
        console.log(user)
        user.save();
        sendMail(email,Fname, Lname, EmailSubjects.FIRST_CONNECT, "localhost:5173/auth/account-validation/"+activationToken)

    /*
        #################################################
        ENVOYER LE MAIL DE CHANGEMENT DE MOT DE PASSE ICI
        #################################################
    */

   
}

export default handleUserCreation;