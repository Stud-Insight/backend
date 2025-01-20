import ResponseWrapper from '@/classes/ResponseWrapper';
import config from '@/config/config';
import AuthRequestWrapper from '@/interfaces/AuthRequestWrapper';
import User from '@/models/User';
import { Request, Response } from 'express';
import { GridFSBucket, GridFSFile, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const handleProfilePictureUpload = (req: AuthRequestWrapper, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);

    if (!req.file) { responseWrapper.sendError(400, "FILE_REQUIRED"); return; }

    // TODO - Vulnérabilité potentielle, ex: renommage 'file.exe' en 'file.png'
    if (!["image/png", "image/jpeg"].includes(req.file.mimetype)) { responseWrapper.sendError(400, "INVALID_FILE_TYPE"); return; }

    const dbConnection = mongoose.connection.db;
    if(!dbConnection) throw new Error("Connection with database could not be established");
    const bucket = new GridFSBucket(dbConnection, { bucketName: config.database.filesBucketName });

    const newProfilePictureId = new ObjectId();
    const uploadStream = bucket.openUploadStreamWithId(newProfilePictureId, req.file.originalname, {
        contentType: req.file.mimetype
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
        try {
            const user = await User.findById(req.authDecoded?.id);
            if(!user) throw new Error("User not found");

            // Suppression de l'ancienne image de profil de l'utilisateur
            const oldProfilePictureId = user.profilePicture.toString();
            if (oldProfilePictureId) {
                try {
                    await bucket.delete(new ObjectId(oldProfilePictureId));
                    console.log(`Deleted old profile picture: ${user.profilePicture}`);
                } catch (err) {
                    console.warn(`Failed to delete old profile picture`);
                }
            }
        
            // Mise à jour de l'utilisateur avec l'ID de la nouvelle image
            await User.findByIdAndUpdate(req.authDecoded?.id, { profilePicture: newProfilePictureId });
            
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

export default handleProfilePictureUpload;