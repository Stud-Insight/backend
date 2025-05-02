import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import User from '@/models/User';
import sendMail from '@/utils/mailer';
import ResponseWrapper from '@/classes/ResponseWrapper';
import genActivationToken from '@/generators/activationTokenGen';
import EmailSubjects from '@/enums/emailSubjects';

dotenv.config();

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
        `${process.env.FRONTEND_ENDPOINT}/auth/account-activation/${activationToken}`
    );

};

const getAllUsers = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    try {
        const users = await User.find({})
                                .select('-password -refreshTokens -activationToken -resetToken')
                                .populate('roles')
                                .populate('avatar')
                                .exec();

        responseWrapper.sendSuccess(200, 'OK', users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);

        responseWrapper.sendError(
            500,
            'INTERNAL_SERVER_ERROR',
            'Une erreur est survenue lors de la récupération des utilisateurs.'
        );
    }
};


export default { handleUserCreation, getAllUsers };
