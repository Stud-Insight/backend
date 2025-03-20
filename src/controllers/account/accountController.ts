import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '@/models/User';
import sendMail from '@/utils/mailer';
import ResponseWrapper from '@/classes/ResponseWrapper';
import genActivationToken from '@/generators/activationTokenGen';
import EmailSubjects from '@/enums/emailSubjects';

dotenv.config();

const createUser = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    try {
        const { email, firstName, lastName } = req.body;
        if (!email) {
            return responseWrapper.sendError(400, 'BAD_REQUEST', 'Adresse mail manquante.');
        }
        
        const id = new mongoose.Types.ObjectId();
        const activationToken = genActivationToken({ id: String(id) });
        
        const user = new User({
            _id: id,
            firstName,
            lastName,
            email,
            password: null,
            activationToken,
        });
        await user.save();
        
        sendMail(email, firstName, lastName, EmailSubjects.FIRST_CONNECT, `${process.env.FRONTEND_ENDPOINT}/auth/account-activation/${activationToken}`);
        
        return responseWrapper.sendSuccess(201, 'Utilisateur créé avec succès.', user);
    } catch (error) {
        return responseWrapper.sendError(500, 'INTERNAL_SERVER_ERROR', 'Erreur serveur.', error);
    }
};

const getUsers = async (_req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    try {
        const users = await User.find();
        return responseWrapper.sendSuccess(200, 'Utilisateurs récupérés avec succès.', users);
    } catch (error) {
        return responseWrapper.sendError(500, 'INTERNAL_SERVER_ERROR', 'Erreur serveur.', error);
    }
};

const getUserById = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return responseWrapper.sendError(404, 'NOT_FOUND', 'Utilisateur non trouvé.');
        }
        return responseWrapper.sendSuccess(200, 'Utilisateur récupéré avec succès.', user);
    } catch (error) {
        return responseWrapper.sendError(500, 'INTERNAL_SERVER_ERROR', 'Erreur serveur.', error);
    }
};

const updateUser = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return responseWrapper.sendError(404, 'NOT_FOUND', 'Utilisateur non trouvé.');
        }
        return responseWrapper.sendSuccess(200, 'Utilisateur mis à jour avec succès.', user);
    } catch (error) {
        return responseWrapper.sendError(500, 'INTERNAL_SERVER_ERROR', 'Erreur serveur.', error);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return responseWrapper.sendError(404, 'NOT_FOUND', 'Utilisateur non trouvé.');
        }
        return responseWrapper.sendSuccess(200, 'Utilisateur supprimé avec succès.');
    } catch (error) {
        return responseWrapper.sendError(500, 'INTERNAL_SERVER_ERROR', 'Erreur serveur.', error);
    }
};

export default { createUser, getUsers, getUserById, updateUser, deleteUser };
