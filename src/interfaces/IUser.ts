import { ObjectId } from "mongoose";
import RefreshTokenInformations from "./tokens/RefreshTokenInformations";

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
    refreshTokens: RefreshTokenInformations[],
    resetToken?: string,
    chats: ObjectId[]
}

export default IUser;