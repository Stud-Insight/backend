import { Request, Response } from 'express';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

const uploadProfilePicture = async (req: Request, res: Response) => {

    if (!req.file) { res.status(400).send('Aucune image fournie.'); return; }

    const dbConnection = mongoose.connection.db;
    if(!dbConnection) throw new Error("Connection with database could not be established");
    const bucket = new GridFSBucket(dbConnection, { bucketName: "Files" });


    const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
        res.status(201).send('Image sauvegardée avec succès.');
    });

    uploadStream.on('error', (err) => {
        console.error('An error has occurred during the GridFS saving process:', err);
        res.status(500).send('Erreur lors de la sauvegarde de l\'image.');
    });

}

export default { uploadProfilePicture };