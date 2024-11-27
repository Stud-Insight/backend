import AuthRequestWrapper from '@/interfaces/AuthRequestWrapper';
import ResponseWrapper from '@/classes/ResponseWrapper';
import { getPermissionsFromUserId } from '@/utils/roles';
import { NextFunction, response, Response } from 'express';

const hasPermissions = (...permissions: String[]) => {
    return async (req: AuthRequestWrapper, res: Response, next: NextFunction) => {
        if(!req.authDecoded) throw new Error("Please use the 'hasPermissions' middleware after a 'verifyAuth' middleware.");
        const responseWrapper = new ResponseWrapper(res);

        const possessedPermissions = await getPermissionsFromUserId(req.authDecoded.id);
        
        if(permissions.some((permission) => !possessedPermissions.includes(permission))) { responseWrapper.sendError(401, "INSUFFICIENT_PERMISSIONS"); return; }

        next();
    }
}

export default hasPermissions;