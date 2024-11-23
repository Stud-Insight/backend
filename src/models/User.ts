import { Schema, model } from "mongoose";
import config from 'config';
import IUser from "@/interfaces/IUser";

type Validator = (v: any) => Boolean; 

const isEmailValid: Validator = (v: string) => {
    return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(v);
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: [function() { return this.activationDate != undefined }, "An activated account must have a password."]},
    roles: { type: [Schema.Types.ObjectId], ref: "Role", default: [] },
    email: {
        type: String,
        validate: [isEmailValid, "{VALUE} is not a valid email."],
        required: true
    },
    profilePicture: { type: Schema.Types.ObjectId, ref: config.get('database.filesBucketName') + ".files", required: false },
    activationDate: { type: Date },
    activationToken: { type: String },
    lastLogin: { type: Date },
    refreshToken: { type: String }
}, { minimize: false });

export default model("users", userSchema);