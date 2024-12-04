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
    forgotToken?: string
}

export default IUser;