import IRole from "@/interfaces/IRole";
import IUser from "@/interfaces/IUser";
import Role from "@/models/Role";
import User from "@/models/User";
import mongoose, { ObjectId, Schema, model } from "mongoose";

export const createRole = async (name: String, ...permissions: String[]) => {
    const role = await Role.findOne({name});
    if (role) {
        llog.warn(`Le rôle ${name} existe déjà, création ignorée.`); 
        return;
    }
    createRoleNoCheck(name, ...permissions);
}

export const createRoleNoCheck = async (name: String, ...permissions: String[]) => {
    const res = await Role.create({name, permissions})
    if (!res) { llog.error(`Échèc de la création / sauvegarde du rôle ${name}.`); throw new Error(); }
}

export const addRoles = async (userId: String, ...roles: IRole[]) => {
    const user = await User.findById(userId);
    if (!user) return;
    const filter = roles.map(role => ({ _id: role.id }));
    const rolesToInsert = await Role.find({ $or: filter });
    user.roles = [...user.roles, ...rolesToInsert.map((role) => role.id as ObjectId)];
    await user.save();
}

export const addRolesFromNames = async (userId: String, ...rolesName: String[]) => {
    const roles = await Role.find({ name: { $in: rolesName } });
    addRoles(userId, ...roles);
}

export const getRoles = async (ids: String[]): Promise<IRole[]> => {
    let filter: { _id: String }[] = []
    for(const id of ids) filter.push({ _id: id });
    const roles: IRole[] = await Role.find({ $or: filter });
    return roles;
}


export const getRolesFromUserId = async (userId: String): Promise<IRole[]> => {
    const user: IUser | null = await User.findById(userId);
    if(!user) return [];
    return getRoles(user.roles.map((objId: ObjectId) => objId.toString()));
}

export const getPermissionsFromRolesIds = async (ids: String[]): Promise<String[]> => {
    const roles = await getRoles(ids);
    let possessedPermissions: String[] = [];
    roles.forEach((role) => { possessedPermissions = [...new Set([...possessedPermissions, ...role.permissions])] });
    return possessedPermissions;
}

export const getPermissionsFromRoles = async (roles: IRole[]): Promise<String[]> => {
    let possessedPermissions: String[] = [];
    roles.forEach((role) => { possessedPermissions = [...new Set([...possessedPermissions, ...role.permissions])] });
    return possessedPermissions;
}

export const getPermissionsFromUserId = async (userId: String): Promise<String[]> => {
    return getRolesFromUserId(userId).then((roles) => getPermissionsFromRoles(roles));
}