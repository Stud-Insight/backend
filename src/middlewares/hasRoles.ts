import { IRole } from '@/models/Role';
import User, { IUser } from '@/models/User';
import AuthRequestWrapper from '@/interfaces/AuthRequestWrapper';
import ResponseWrapper from '@/classes/ResponseWrapper';
import { getRolesFromUserId } from '@/utils/roles';
import { NextFunction, Response } from 'express';

const hasRoles = (...roles: String[]) => {
    return async (req: AuthRequestWrapper, res: Response, next: NextFunction) => {
        if(!req?.authDecoded) throw new Error("Please use the 'hasRoles' middleware after a 'verifyAuth' middleware.");
        const responseWrapper = new ResponseWrapper(res);

        const user = await User.findById(req.authDecoded.id) as IUser;
        if(!user) throw new Error("User not found");

        const possessedRoles = (await getRolesFromUserId(user.id)).map((role: IRole) => role.name);
        
        if(possessedRoles.every((role) => !roles.includes(role))) { responseWrapper.sendError(401, "INSUFFICIENT_PERMISSIONS"); return; }
        
        next();
    }
}

export default hasRoles;