import config from "@/config/config";
import IFileDocument from "@/interfaces/IFileDocument";
import FileDocument from "@/models/FileDocument";
import Result from "@/types/Result";
import { Response } from "express";
import { GridFSBucket, ObjectId } from "mongodb";
import mongoose, { Types } from "mongoose";
import { isValidObjectId } from "mongoose";
import { Readable } from "stream";

enum FileManagerErrors {
    CONNECTION_WITH_DATABASE_FAILED = "CONNECTION_WITH_DATABASE_FAILED",
    UNABLE_TO_SAVE = "UNABLE_TO_SAVE",
    FILE_NOT_FOUND = "FILE_NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    UNABLE_TO_DOWNLOAD = "UNABLE_TO_DOWNLOAD"
}

class FileManager {
    /* ========== */
    private readonly dbConnection: mongoose.mongo.Db;
    private readonly bucket: GridFSBucket;
    public static readonly errors = FileManagerErrors;

    /* ========== */
    public constructor() {
        if(!mongoose.connection.db) { llog.error("Could not establish connection with database."); throw new Error(FileManagerErrors.CONNECTION_WITH_DATABASE_FAILED); }
        this.dbConnection = mongoose.connection.db;
        this.bucket = new GridFSBucket(this.dbConnection, { bucketName: config.database.filesBucketName });    
    }
    
    /* ========== */
    public async download(requesterId: Types.ObjectId, fileDocId: Types.ObjectId): Promise<Result<{ stream: Readable, contentType: string }>> {

        const fileDoc: IFileDocument | null = await FileDocument.findById(fileDocId);
        if(!fileDoc) return { success: false, error: FileManager.errors.FILE_NOT_FOUND };

        if(!(await fileDoc.canBeViewedByUser(requesterId))) return { success: false, error: FileManager.errors.UNAUTHORIZED };

        const rawFile = (await this.bucket.find({ _id: fileDoc.rawFile }).toArray())[0];
        if (!rawFile) return { success: false, error: FileManager.errors.FILE_NOT_FOUND };

        return {
            success: true,
            data: {
                stream: this.bucket.openDownloadStream(fileDoc.rawFile),
                contentType: rawFile.contentType as string
            }
        };

    }


    public async upload(requesterId: Types.ObjectId, file: Express.Multer.File): Promise<Result<IFileDocument>> {
        const id = new ObjectId();
        const uploadStream = this.bucket.openUploadStreamWithId(id, file.originalname, { contentType: file.mimetype });
        
        const uploadPromise = new Promise<void>((resolve, reject) => {
            uploadStream.on('finish', () => {
                resolve();
            });
            uploadStream.on('error', (err) => {
                llog.error('Une erreur est survenue lors de la sauvegarde avec GridFS:', err);
                reject(new Error(FileManagerErrors.UNABLE_TO_SAVE));
            });
            uploadStream.end(file.buffer);
        });

        try {
            await uploadPromise;
            const fileDoc = await FileDocument.create({ rawFile: id, owner: requesterId });
            return { success: true, data: fileDoc };
        } catch (err: any) {
            return { success: false, error: err.message };
        }

    }

    public async delete(requesterId: Types.ObjectId, fileId: Types.ObjectId): Promise<Result<undefined>> {
        const file: IFileDocument | null = await FileDocument.findById(fileId);
        if(!file) return { success: false, error: FileManagerErrors.FILE_NOT_FOUND };
        if(!file.owner.equals(requesterId)) return { success: false, error: FileManagerErrors.UNAUTHORIZED }
        await this.bucket.delete(file.rawFile);
        await FileDocument.findByIdAndDelete(fileId);
        return { success: true, data: undefined }
    }

}

export default FileManager;