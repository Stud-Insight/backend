import User from '@/models/User';
import ResponseWrapper from '@/classes/ResponseWrapper';
import { getRolesFromUserId } from '@/utils/roles';
import { NextFunction, Request, Response } from 'express';
import IRole from '@/interfaces/IRole';
import IUser from '@/interfaces/IUser';

const hasRoles = (...roles: String[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!req.authDecoded) throw new Error("Please use the 'hasRoles' middleware after a 'verifyAuth' middleware.");
        const responseWrapper = new ResponseWrapper(res);

        const user = await User.findById(req.authDecoded.id) as IUser;
        if(!user) throw new Error("User not found");

        const possessedRoles = (await getRolesFromUserId(user.id)).map((role: IRole) => role.name);
        
        if(possessedRoles.every((role) => !roles.includes(role))) { responseWrapper.sendError(401, "INSUFFICIENT_PERMISSIONS"); return; }
        
        next();
    }
}

export default hasRoles;