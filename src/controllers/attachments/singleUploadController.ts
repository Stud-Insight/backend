import ResponseWrapper from '@/classes/ResponseWrapper';
import config from '@/config/config';
import User from '@/models/User';
import { Request, Response } from 'express';
import { GridFSBucket, GridFSFile, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const handleAvatarUpload = (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    if (!req.file) { responseWrapper.sendError(400, "FILE_REQUIRED"); return; }

    // TODO - Vulnérabilité potentielle, ex: renommage 'file.exe' en 'file.png'
    if (!["image/png", "image/jpeg"].includes(req.file.mimetype)) { responseWrapper.sendError(400, "INVALID_FILE_TYPE"); return; }

    const dbConnection = mongoose.connection.db;
    if(!dbConnection) throw new Error("Connection with database could not be established");
    const bucket = new GridFSBucket(dbConnection, { bucketName: config.database.filesBucketName });

    const newAvatarId = new ObjectId();
    const uploadStream = bucket.openUploadStreamWithId(newAvatarId, req.file.originalname, {
        contentType: req.file.mimetype
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
        try {
            const user = await User.findById(req.authDecoded!.id);
            if(!user) throw new Error("User not found");

            // Suppression de l'ancienne image de profil de l'utilisateur
            const oldAvatarId = user.avatar.toString();
            if (oldAvatarId) {
                try {
                    await bucket.delete(new ObjectId(oldAvatarId));
                    console.log(`Deleted old profile picture: ${user.avatar}`);
                } catch (err) {
                    console.warn(`Failed to delete old profile picture`);
                }
            }
        
            // Mise à jour de l'utilisateur avec l'ID de la nouvelle image
            await User.findByIdAndUpdate(req.authDecoded!.id, { avatar: newAvatarId });
            
            res.status(201).send('Image sauvegardée avec succès.');
        } catch (error) {
            console.error('Error updating user profile picture:', error);
            responseWrapper.sendError(500, 'INTERNAL_SERVER_ERROR');
        }
    });

    uploadStream.on('error', (err) => {
        console.error('An error has occurred during the GridFS saving process:', err);
        res.status(500).send('Erreur lors de la sauvegarde de l\'image.');
    });

}

export default handleAvatarUpload;