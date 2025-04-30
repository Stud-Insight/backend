import ResponseWrapper from "@/classes/ResponseWrapper";
import { Request, Response } from "express";
import { Types } from "mongoose";

class TerController {
    /* ===== Attribut(s) ===== */


    /* ===== Constructeur(s) ===== */
    public constructor() {

    }

    /* ===== Méthode(s) ===== */

    public getTERInfo = async (req: Request, res: Response) => {
        const reswrap = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        if(!req.params?.id) { reswrap.sendError(400, "MISSING_ID"); return; }
        //TODO call à la fonction nécessaire
        //TODO switch pour result.success = false
    }

    /**
     * ⚠️ ATTENTION, cette méthode ne doit être utilisée qu'**après** le middleware `verifyAuth`.
     */
    public getAll = async (req: Request, res: Response) => {
        const reswrap = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        if(!req.params?.category) { reswrap.sendError(400, "MISSING_CATEGORY"); return; }
        //TODO call à la fonction nécessaire
        //TODO switch pour result.success = false
    }

    public create = async (req: Request, res: Response) => {
        const reswrap = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        if(!req.body?.form) { reswrap.sendError(400, "MISSING_FORM"); return; }
        //TODO call à la fonction nécessaire (parse le form avec une interface ?)
        //TODO switch pour result.success = false
    }

    public delete = async (req: Request, res: Response) => {
        const reswrap = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        if(!req.params?.id) { reswrap.sendError(400, "MISSING_ID"); return; }
        //TODO call à fonction nécessaire
        //TODO switch pour result.success = false
    }

    public edit = async (req: Request, res: Response) => {
        const reswrap = new ResponseWrapper(res);
        const requesterId = new Types.ObjectId(req.authDecoded!.id as string);
        if(!req.params?.id) { reswrap.sendError(400, "MISSING_ID"); return; }
        if(!req.body?.form) { reswrap.sendError(400, "MISSING_FORM"); return; }
        //TODO call à fonction nécessaire
        //TODO switch pour result.success = false
    }



}

export default TerController;