import Role, { IRole } from "@/models/Role";
import User, { IUser } from "@/models/User";
import { ObjectId } from "mongoose";

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