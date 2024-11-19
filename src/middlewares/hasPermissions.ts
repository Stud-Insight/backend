import { getPermissionsFromUserId } from '@/utils/roles';
import { NextFunction, Request, Response } from 'express';

const hasPermissions = (permissions: String[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!req.authDecoded) throw new Error("Please use the 'hasPermissions' middleware after a 'verifyAuth' middleware.");
    
        const possessedPermissions = await getPermissionsFromUserId(req.authDecoded.id);
        
        if(permissions.some((permission) => !possessedPermissions.includes(permission))) { res.sendStatus(401); return; }

        for(const requiredRole of permissions) {
            if(!possessedPermissions.includes(requiredRole)) { res.sendStatus(401); return; }
        }

        next();
    }
}

export default hasPermissions;