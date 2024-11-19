import { IRole } from '@/models/Role';
import User, { IUser } from '@/models/User';
import { getRolesFromUserId } from '@/utils/roles';
import { NextFunction, Request, Response } from 'express';

const hasRoles = (roles: String[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!req.authDecoded) throw new Error("Please use the 'hasRoles' middleware after a 'verifyAuth' middleware.");
        
        const user = await User.findOne({ id: req.authDecoded.id }) as IUser;
        if(!user) throw new Error("User not found");

        const possessedRoles = (await getRolesFromUserId(user.id)).map((role: IRole) => role.name);
        
        if(possessedRoles.every((role) => !roles.includes(role))) { res.sendStatus(401); return; }
        
        next();
    }
}

export default hasRoles;