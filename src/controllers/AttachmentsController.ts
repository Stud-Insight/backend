import FileManager from "@/classes/FileManager";
import ResponseWrapper from "@/classes/ResponseWrapper";
import IUser from "@/interfaces/IUser";
import User from "@/models/User";
import { Request, Response } from 'express';
import { isValidObjectId, Types } from "mongoose";

class AttachmentsController {
    /* ========== */
    private readonly fileManager: FileManager;
    
    /* ========== */
    public constructor() {
        this.fileManager = new FileManager();
    }
    
    /* ========== */

    /**
     * Route associée :
     * __POST__ - `./attachements/avatar` (auth protected)
     */
    public changeAvatar = async (req: Request, res: Response): Promise<void> => {
        const responseWrapper = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        
        if (!req.file) { responseWrapper.sendError(400, "FILE_REQUIRED"); return; }
        
        // TODO - Vulnérabilité potentielle, ex: renommage 'file.exe' en 'file.png'
        if (!["image/png", "image/jpeg"].includes(req.file.mimetype)) { responseWrapper.sendError(400, "INVALID_FILE_TYPE"); return; }

        const uploadResult = await this.fileManager.upload(requesterId, req.file);

        llog.log(uploadResult);

        if(!uploadResult.success) {
            switch(uploadResult.error) {
                case FileManager.errors.UNABLE_TO_SAVE:
                    responseWrapper.sendError(500, "UNABLE_TO_SAVE");
                    break;
                default:
                    responseWrapper.sendError(500, "UNKNOWN_ERROR");
                    break;
            }
            return;
        }

        // Suppression de l'ancienne image de profil de l'utilisateur
        const user = await User.findById(req.authDecoded!.id) as IUser; // Cast to `IUser` is fine, otherwise the user making the request doesn't exist.
        if(user.avatar) {
            const oldAvatarId = user.avatar.toString();
            const deleteResult = await this.fileManager.delete(requesterId, new Types.ObjectId(oldAvatarId));
            if(!deleteResult.success) {
                switch(deleteResult.error) {
                    case FileManager.errors.FILE_NOT_FOUND:
                        /*
                            Cas où l'avatar précédent a déjà été supprimé mais
                            que l'identifiant de ce dernier subsiste dans le champ
                            avatar de l'utilisateur. Dans ce cas, ne rien faire,
                            le cours du programme le remplacera automatiquement.
                        */
                        break;
                    default:
                        responseWrapper.sendError(500, deleteResult.error);
                        return;
                }
            }
        }

        // Mise à jour de l'utilisateur avec l'ID de la nouvelle image
        await User.findByIdAndUpdate(req.authDecoded!.id, { avatar: uploadResult.data._id });
        
        res.status(200).json({ message: "Avatar changé avec succès." });
    }

    /**
     * Route associée :
     * __POST__ - `./attachments/upload (auth protected)
     */
    public upload = async (req: Request, res: Response) => {
        const responseWrapper = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        
        if(!req.file) { responseWrapper.sendError(400, "MISSING_FILE"); return; }
        const uploadResult = await this.fileManager.upload(requesterId, req.file);

        if(!uploadResult.success) {
            switch(uploadResult.error) {
                case FileManager.errors.UNABLE_TO_SAVE:
                    responseWrapper.sendError(500, "UNABLE_TO_SAVE");
                    break;
                default:
                    responseWrapper.sendError(500, "UNKNOWN_ERROR");
                    break;
            }
            return;
        }

        res.status(200).json({
            message: `Le fichier ${req.file.originalname} a été uploadé avec succès.`,
            fileId: uploadResult.data._id
        });
    }

    /**
     * Route associée :
     * __GET__ - `./attachments/:fileId` (auth protected)
     */
    public download = async (req: Request, res: Response) => {
        const responseWrapper = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);

        if(!req.params?.fileId) { responseWrapper.sendError(400, "MISSING_FILE_ID"); return; }

        if(!isValidObjectId(req.params.fileId)) { responseWrapper.sendError(400, "INVALID_ID_FORMAT"); return; }

        const getResult = await this.fileManager.download(requesterId, new Types.ObjectId(req.params.fileId));
        if(!getResult.success) {
            switch(getResult.error) {
                case FileManager.errors.FILE_NOT_FOUND:
                    responseWrapper.sendError(404, "FILE_NOT_FOUND");
                    break;
                case FileManager.errors.UNAUTHORIZED:
                    responseWrapper.sendError(401, "UNAUTHORIZED");
                    break;
                default:
                    responseWrapper.sendError(500, "UNKNOWN_ERROR");
                    break;
            }
            return;
        }

        res.set("Content-Type", getResult.data.contentType);
        getResult.data.stream.pipe(res);
        
        getResult.data.stream.on("error", (err) => {
            console.error("Erreur de lecture du fichier:", err);
            responseWrapper.sendError(500, "INTERNAL_ERROR");
        });
    }

    /**
     * Route associée :
     * __DELETE__ - `./attachments/:fileId` (auth protected) 
     */
    public delete = async (req: Request, res: Response) => {
        const responseWrapper = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        
        if(!req.params?.fileId) { responseWrapper.sendError(400, "MISSING_FILE_ID"); return; }

        const deleteResult = await this.fileManager.delete(requesterId, new Types.ObjectId(req.params.fileId));
        
        if(!deleteResult.success) {
            switch(deleteResult.error) {
                case FileManager.errors.FILE_NOT_FOUND:
                    responseWrapper.sendError(404, "FILE_NOT_FOUND");
                    break;
                case FileManager.errors.UNAUTHORIZED:
                    responseWrapper.sendError(401, "UNAUTHORIZED");
                    break;
                default:
                    responseWrapper.sendError(500, "UNKNOWN_ERROR");
                    break;
            }
            return;
        }

        res.status(200).json({ message: "Fichier supprimé avec succès." });
    }

}

export default AttachmentsController;