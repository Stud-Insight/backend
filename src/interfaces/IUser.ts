import { ObjectId } from "mongoose";

interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    password?: string,
    email: string,
    roles: ObjectId[],
    profilePicture: ObjectId,
    activationDate?: Date,
    activationToken?: string,
    lastLogin?: Date,
    refreshToken?: string
}

export default IUser;