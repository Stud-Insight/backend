import { Schema, model } from "mongoose";

import IUser from "@/interfaces/IUser";
import isEmailValid from "./validators/isEmailValid";
import RefreshTokenInformations from "@/interfaces/tokens/RefreshTokenInformations";
import config from "@config/config";

const refreshTokenInfoSchema = new Schema<RefreshTokenInformations>({
    jti: { type: String, required: true },
    exp: { type: Date, required: true },
    ip: { type: String, required: true }
});

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String, required: [function() { return this.activationDate != undefined }, "An activated account must have a password."]},
    roles: { type: [Schema.Types.ObjectId], ref: "Role", default: [] as Schema.Types.ObjectId[] },
    email: {
        type: String,
        validate: [isEmailValid, "{VALUE} is not a valid email."],
        required: true
    },
    avatar: { type: Schema.Types.ObjectId, ref: config.database.filesBucketName + ".files", required: false },
    activationDate: { type: Date },
    activationToken: { type: String },
    lastLogin: { type: Date },
    refreshTokens: { type: [refreshTokenInfoSchema], default: [], },
    resetToken: { type: String }
}, { minimize: false });

export default model("users", userSchema);