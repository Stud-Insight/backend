import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import dotenv from 'dotenv'
import ResponseWrapper from '@/classes/ResponseWrapper';

dotenv.config();

const handleGetChat = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    const member: ObjectId = req.body?.email;

    if (!member) {
        responseWrapper.sendError(
            400,
            'BAD_REQUEST',
            'Membre manquant.'
        );
        return;
    }

};

export default { handleGetChat };
