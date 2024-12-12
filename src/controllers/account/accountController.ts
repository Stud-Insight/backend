import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ResponseWrapper from '@/classes/ResponseWrapper';
import User from '@/models/User';
import genActivationToken from '@/generators/activationTokenGen';
import sendMail from '@/utils/mailer';
import EmailSubjects from '@/enums/emailSubjects';

const handleUserCreation = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    const email: string = req.body?.email;
    const lastName: string = req.body?.lastName;
    const firstName: string = req.body?.firstName;

    if (!email) {
        responseWrapper.sendError(
            400,
            'BAD_REQUEST',
            'Adresse mail manquante.'
        );
        return;
    }

    const id = new mongoose.Types.ObjectId();
    const activationToken = genActivationToken({ id: String(id) });

    const user = new User({
        _id: id,
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: null,
        activationToken: activationToken,
    });
    user.save();

    sendMail(
        email,
        firstName,
        lastName,
        EmailSubjects.FIRST_CONNECT,
        'http://localhost:5173/auth/account-validation/' + activationToken
    );

};

export default { handleUserCreation };
